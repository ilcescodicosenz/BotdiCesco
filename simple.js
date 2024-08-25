import path from 'path';  
import fetch from 'node-fetch';
import PhoneNumber from 'awesome-phonenumber';
import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type'; 
import { fileURLToPath } from 'url';
import Jimp from 'jimp';  
import chalk from 'chalk';
import { format } from 'util';
import store from './store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
    default: _makeWaSocket,
    proto,
    downloadContentFromMessage,
    jidDecode,
    areJidsSameUser,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
} = (await import('@whiskeysockets/baileys')).default;

export function makeWASocket(connectionOptions, options = {}) {
    let conn = _makeWaSocket(connectionOptions);
    let sock = Object.defineProperties(conn, {
        chats: {
            value: { ...(options.chats || {}) },
            writable: true
        },
        decodeJid: {
            value(jid) {
                return jid ? jid.decodeJid() : null;
            }
        },
        logger: {
            get() {
                return {
                    info(...args) {
                        console.log(chalk.bold.bgGreen('INFO'), format(...args));
                    },
                    error(...args) {
                        console.error(chalk.bold.bgRed('ERROR'), format(...args));
                    },
                    warn(...args) {
                        console.warn(chalk.bold.bgYellow('WARNING'), format(...args));
                    },
                };
            },
            enumerable: true
        },
        sendGataBot: {
            async value(jid, text = '', buffer, title, body, url, quoted, options) {
                if (buffer) {
                    const type = await conn.getFile(buffer).catch(() => buffer);
                    buffer = type.data;
                }
                const prep = generateWAMessageFromContent(jid, { 
                    extendedTextMessage: { 
                        text: text, 
                        contextInfo: { 
                            externalAdReply: { 
                                title: title, 
                                body: body, 
                                thumbnail: buffer, 
                                sourceUrl: url 
                            }, 
                            mentionedJid: await conn.parseMention(text) 
                        } 
                    } 
                }, { quoted });
                return conn.relayMessage(jid, prep.message, { messageId: prep.key.id });
            }
        },
        sendPayment: {
            async value(jid, amount, text, quoted) {
                conn.relayMessage(jid,  {
                    requestPaymentMessage: {
                        currencyCodeIso4217: 'PEN',
                        amount1000: amount,
                        requestFrom: null,
                        noteMessage: {
                            extendedTextMessage: {
                                text: text,
                                contextInfo: {
                                    externalAdReply: { showAdAttribution: true }, 
                                    mentionedJid: conn.parseMention(text)
                                }
                            }
                        }
                    }
                }, {});
            }
        },
        getFile: {
            async value(PATH, saveToFile = false) {
                let filename;
                const data = Buffer.isBuffer(PATH) ? PATH : /^https?:\/\//.test(PATH) ? await (await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : Buffer.alloc(0);
                if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer');
                const type = await fileTypeFromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
                if (data && saveToFile && !filename) {
                    filename = path.join(__dirname, '../tmp/' + Date.now() + '.' + type.ext);
                    await fs.promises.writeFile(filename, data);
                }
                return { filename, ...type, data, deleteFile: () => filename && fs.promises.unlink(filename) };
            },
            enumerable: true
        },
        sendContact: {
            async value(jid, data, quoted, options) {
                if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
                let contacts = [];
                for (let [number, name] of data) {
                    number = number.replace(/[^0-9]/g, '');
                    let njid = number + '@s.whatsapp.net';
                    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name.replace(/\n/g, '\\n')};;;
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD`.trim();
                    contacts.push({ vcard, displayName: name });
                }
                return await conn.sendMessage(jid, {
                    contacts: {
                        displayName: contacts.length >= 2 ? `${contacts.length} contacts` : contacts[0].displayName,
                        contacts,
                    }
                }, { quoted, ...options });
            },
            enumerable: true
        },
        resize: {
            async value(buffer, width, height) {
                const image = await Jimp.read(buffer);
                return await image.resize(width, height).getBufferAsync(Jimp.MIME_JPEG);
            }
        },
        relayWAMessage: {
            async value(pesanfull) {
                await conn.sendPresenceUpdate(pesanfull.message.audioMessage ? 'recording' : 'composing', pesanfull.key.remoteJid);
                const mekirim = await conn.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id });
                conn.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
                return mekirim;
            }
        },
        sendListM: {
            async value(jid, button, rows, quoted, options = {}) {
                const sections = [{ title: button.title, rows }];
                const listMessage = {
                    text: button.description,
                    footer: button.footerText,
                    mentions: await conn.parseMention(button.description),
                    title: '',
                    buttonText: button.buttonText,
                    sections
                };
                return conn.sendMessage(jid, listMessage, { quoted });
            }
        },
        sendList: {
            async value(jid, title, text, footer, buttonText, buffer, listSections, quoted, options) {
                if (buffer) {
                    const type = await conn.getFile(buffer).catch(() => buffer);
                    buffer = type.data;
                }
                const sections = listSections.map(([title, rows]) => ({
                    title: title || '',
                    rows: rows.map(([rowTitle, rowId, description]) => ({
                        title: rowTitle || '',
                        rowId: rowId || '',
                        description: description || ''
                    }))
                }));
                const listMessage = { text, footer, title, buttonText, sections };
                return await conn.sendMessage(jid, listMessage, { quoted, ...options });
            }
        },
        sendFile: {
            async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
                let type = await conn.getFile(path, true);
                let { res, data: file, filename: pathFile } = type;
                if (res && res.status !== 200 || file.length <= 65536) throw new Error('File too large or fetch failed.');
                let mtype = '';
                const mimetype = options.mimetype || type.mime;
                if (/image/.test(type.mime)) mtype = 'image';
                else if (/video/.test(type.mime)) mtype = 'video';
                else if (/audio/.test(type.mime)) mtype = 'audio';
                else mtype = 'document';

                let message = {
                    ...options,
                    caption,
                    ptt,
                    [mtype]: { url: pathFile },
                    mimetype,
                    fileName: filename || pathFile.split('/').pop()
                };

                return await conn.sendMessage(jid, message, { quoted, ...options });
            },
            enumerable: true
        }, 
        reply: {
            value(jid, text = '', quoted, options) {
                return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text }, { quoted });
            }
        },
        getName: {
            value(jid = '', withoutContact = false) {
                jid = conn.decodeJid(jid);
                const v = conn.chats[jid] || {};
                return withoutContact ? '' : v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
            },
            enumerable: true
        },
        sendPoll: {
            async value(jid, question, options) {
                const poll = {
                    name: question,
                    options: options.map(opt => ({ optionName: opt })),
                    selectableOptionsCount: 1,
                };
                return await conn.sendMessage(jid, { pollCreationMessage: poll });
            }
        },
        sendGif: {
            async value(jid, gifUrl, caption = '', quoted, options = {}) {
                const message = {
                    video: { url: gifUrl },
                    caption,
                    mimetype: 'video/gif'
                };
                return await conn.sendMessage(jid, message, { quoted, ...options });
            }
        },
        sendInteractive: {
            async value(jid, title, message, footer, buttons, quoted, options = {}) {
                const buttonMessage = {
                    text: message,
                    footer: footer,
                    title: title,
                    buttons: buttons.map(btn => ({
                        buttonId: btn.id,
                        buttonText: { displayText: btn.text },
                        type: 1
                    }))
                };
                return await conn.sendMessage(jid, buttonMessage, { quoted, ...options });
            }
        },
    });

    store.bind(sock);
    return sock;
}

export function smsg(conn, m) {
    if (!m) return m;
    let M = proto.WebMessageInfo;
    m = M.fromObject(m);
    m.conn = conn;
    return m;
}

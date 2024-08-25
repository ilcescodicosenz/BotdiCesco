import { WAMessageStubType } from '@adiwajshing/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import { watchFile } from 'fs';
const terminalImage = global.opts['img'] ? require('terminal-image') : '';
const urlRegex = (await import('url-regex-safe')).default({ strict: false });
const prefix = ['!', '.', '#', '/', '&', '°', '*'];

export default async function (m, conn = { user: {} }) {
    let nome = await conn.getName(m.sender);
    let gruppo = await conn.getName(m.chat);
    let img;
    
    try {
        if (global.opts['img']) img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false;
    } catch (e) {
        console.error(e);
    }

    let filesize = (m.msg ? m.msg.vcard ? m.msg.vcard.length : m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.msg.axolotlSenderKeyDistributionMessage ? m.msg.axolotlSenderKeyDistributionMessage.length : m.text ? m.text.length : 0 : m.text ? m.text.length : 0) || 0;
    console.log(`${chalk.green('%s /')}${chalk.yellow('/ %s')}`.trim(), nome, gruppo);
    if (img) console.log(img.trimEnd());

    if (typeof m.text === 'string' && m.text) {
        let log = m.text.replace(/\u200e+/g, '');
        let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|((?:.||[\n\r])+?))(?=\S?(?:[\s\n]|$))/g;
        let mdFormat = (depth = 4) => (_, text, monospace) => {
            let types = { _: 'italic', '*': 'bold', '~': 'strikethrough' };
            text = text || monospace;
            let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)));
            return formatted;
        };

        if (log.length < 1024) {
            log = log.replace(urlRegex, (url, i, text) => {
                let end = url.length + i;
                return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url;
            });
        }

        console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log);

        for (const pref of prefix) {
            if (m.text.startsWith(pref)) {
                const comando = m.text.substring(pref.length).trim();
                switch (comando) {
                    case 'ping':
                        console.log('Pong!');
                        break;
                    case 'info':
                        console.log(`Nome: ${nome}\nGruppo: ${gruppo}\nFilesize: ${filesize}`);
                        break;
                    case 'img':
                        if (img) console.log(img.trimEnd());
                        break;
                    case 'time':
                        console.log(`Orario attuale: ${new Date().toLocaleString()}`);
                        break;
                    case 'greet':
                        console.log(`Ciao ${nome}, come posso aiutarti oggi?`);
                        break;
                    case 'urls':
                        const urls = log.match(urlRegex);
                        if (urls) {
                            console.log('URL trovati nel messaggio:');
                            urls.forEach(url => console.log(chalk.blueBright(url)));
                        } else {
                            console.log('Nessun URL trovato nel messaggio.');
                        }
                        break;
                    default:
                        console.log('Comando non trovato');
                }
            }
        }
    }
}

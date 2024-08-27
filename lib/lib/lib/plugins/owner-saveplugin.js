import fs from 'fs';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw '𝐈𝐧𝐬𝐞𝐫𝐢𝐬𝐜𝐢\x20𝐢𝐥\x20𝐧𝐨𝐦𝐞\x20𝐝𝐞𝐥\x20𝐩𝐥𝐮𝐠𝐢𝐧\x20𝐝𝐚\x20𝐬𝐚𝐥𝐯𝐚𝐫𝐞';
    if (!m.quoted) throw '𝐑𝐢𝐬𝐩𝐨𝐧𝐝𝐢\x20𝐚𝐥\x20𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨';

    let filePath = 'plugins/' + text + '.js';
    await fs.writeFileSync(filePath, m.quoted.text);

    let replyMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: 'Il plugin è stato salvato',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/876cc3f192ec040e33aba.png')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, `_${filePath}_`, replyMessage);
};

handler.help = ['salva <nombre>'];
handler.tags = ['owner'];
handler.command = /^(salva|salvaplugin)$/i;
handler.rowner = true;

export default handler;
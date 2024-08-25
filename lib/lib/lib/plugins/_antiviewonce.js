import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export async function before(m, { isAdmin, isBotAdmin }) {
    let chat = db.data.chats[m.chat];
    
    if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return;
    
    if (!chat.antiviewonce || chat.isBanned) return;
    
    if (m.mtype === 'viewOnceMessageV2') {
        let msg = m.message.viewOnceMessageV2.message;
        let type = Object.keys(msg)[0];

        let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');
        let buffer = Buffer.concat(await streamToBuffer(media));

        if (/video/.test(type)) {
            return this.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption || 'Video'}\n\nNon si nasconde nulla`, m);
        } else if (/image/.test(type)) {
            return this.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption || 'Immagine'}\n\nNon si nasconde nulla`, m);
        }
    }
}

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return chunks;
}

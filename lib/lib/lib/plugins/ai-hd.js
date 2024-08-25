import { readdirSync, unlinkSync, existsSync, promises as fsPromises } from 'fs';
import path from 'path';
import FormData from 'form-data';
import Jimp from 'jimp';

const handler = async (message, { conn, usedPrefix, command }) => {
    try {
        let quotedMessage = message.quoted ? message.quoted : message;
        let mimeType = (quotedMessage.msg || quotedMessage).mimetype || quotedMessage.mediaType || '';

        if (!mimeType) throw 'ⓘ Nessuna immagine o risposta a un\'immagine specificata per il comando ' + (usedPrefix + command);
        if (!/image\/(jpe?g|png)/.test(mimeType)) throw 'ⓘ Il formato dell\'immagine (' + mimeType + ') non è supportato. Utilizza un\'immagine JPEG o PNG.';

        let locationMessage = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'Halo'
            },
            message: {
                locationMessage: {
                    name: 'Unlimited',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/858218a1dffe89c139b59.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        };

        conn.sendMessage(message.chat, locationMessage);
        let imageBuffer = await quotedMessage.download();
        let enhancedImage = await remini(imageBuffer, 'hd');
        conn.sendMessage(message.chat, { image: enhancedImage }, { quoted: message });
    } catch {
        throw 'ⓘ Errore durante l\'elaborazione dell\'immagine.';
    }
};

handler.help = ['migliora', 'hd', 'enhance'];
handler.tags = ['ai', 'strumenti'];
handler.command = ['migliora', 'hd', 'enhance'];

export default handler;

async function remini(imageBuffer, mode) {
    return new Promise(async (resolve, reject) => {
        const validModes = ['hd', 'enhance', 'recolor'];
        if (!validModes.includes(mode)) mode = validModes[0];

        const url = 'https://inferenceengine.vyro.ai/' + mode + '/';
        const formData = new FormData();
        formData.append('enhance_image_body', Buffer.from(imageBuffer), { filename: 'enhance_image_body.jpg', contentType: 'image/jpeg' });
        formData.append('model_version', 1);

        const req = https.request({
            url: url,
            method: 'POST',
            headers: formData.getHeaders()
        }, (res) => {
            const data = [];
            res.on('data', (chunk) => {
                data.push(chunk);
            });
            res.on('end', () => {
                resolve(Buffer.concat(data));
            });
            res.on('error', (err) => {
                reject(err);
            });
        });

        formData.pipe(req);
    });
}

import fetch from 'node-fetch';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/.test(mime)) {
        let imageBuffer = await q.download();
        let url = await webp2png(imageBuffer);
        let res = await fetch(`https://api.ocr.space/parse/imageurl?apikey=8e65f273cd88957&url=${encodeURIComponent(url)}`);

        if (res.status !== 200) throw new Error(`Error: ${res.statusText}`);
        
        let json = await res.json();
        let parsedText = json?.ParsedResults?.[0]?.ParsedText;

        if (parsedText) {
            m.reply(`Testo riconosciuto:\n${parsedText}`);
        } else {
            m.reply('Nessun testo trovato nell\'immagine.');
        }
    } else {
        m.reply('Rispondi a un\'immagine per utilizzare l\'OCR.');
    }
};

handler.help = ['ocr'];
handler.tags = ['tools'];
handler.command = /^ocr|leggi$/i;

export default handler;
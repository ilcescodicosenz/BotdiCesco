import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

// Funzione per formattare il testo
const formatText = (text) => {
    return text.replace(/\*\*/g, '*');
};

// Handler per il comando "bard" con testo
const bardHandler = async (m, { conn, text, usedPrefix }) => {
    // Controllo se il testo è fornito
    if (!text) {
        return conn.reply(m.chat, `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix}*bard Conosci BixbyBot-MD?*\n\n> ⓘ 𝐒𝐞 𝐮𝐬𝐚𝐭𝐨 𝐜𝐨𝐧 𝐮𝐧 𝐭𝐞𝐬𝐭𝐨, 𝐟𝐨𝐫𝐧𝐢𝐬𝐜𝐞 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 𝐢𝐧 𝐫𝐢𝐬𝐩𝐨𝐬𝐭𝐚 𝐚𝐥𝐥𝐚 𝐫𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐚 𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚𝐭𝐚.\n> ⓘ 𝐒𝐞 𝐮𝐬𝐚𝐭𝐨 𝐜𝐨𝐧 𝐮𝐧'𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞, 𝐟𝐨𝐫𝐧𝐢𝐬𝐜𝐞 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 𝐛𝐚𝐬𝐚𝐭𝐞 𝐬𝐮𝐥 𝐜𝐨𝐧𝐭𝐞𝐧𝐮𝐭𝐨 𝐝𝐞𝐥𝐥'𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞.`, m);
    }
    
    try {
        // Aggiorna lo stato di presenza
        conn.sendPresenceUpdate('composing', m.chat);
        const apiRes = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        const res = await apiRes.json();
        await m.reply(formatText(res.result));
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `⚠️ 𝐄𝐫𝐫𝐨𝐫𝐞 𝐝𝐞𝐥𝐥𝐚 𝐚𝐩𝐢𝐤𝐞𝐲 𝐛𝐚𝐫𝐝`, m);
    }
};

// Handler per il comando "bard" con immagine
const bardimgHandler = async (m, { conn, text }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    // Controlla se il MIME è un'immagine
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let buffer = await q.download();
        conn.sendPresenceUpdate('composing', m.chat);
        let media = await uploader(buffer);
        let json = await (await fetch(`https://aemt.me/bardimg?url=${media}&text=${encodeURIComponent(text)}`)).json();
        conn.sendMessage(m.chat, { text: formatText(json.result) }, { quoted: m });
    } else {
        return conn.reply(m.chat, `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix}*bard Conosci BixbyBot-MD?*\n\n> ⓘ 𝐒𝐞 𝐮𝐬𝐚𝐭𝐨 𝐜𝐨𝐧 𝐮𝐧 𝐭𝐞𝐬𝐭𝐨, 𝐟𝐨𝐫𝐧𝐢𝐬𝐜𝐞 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 𝐢𝐧 𝐫𝐢𝐬𝐩𝐨𝐬𝐭𝐚 𝐚𝐥𝐥𝐚 𝐫𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐚 𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜𝐚𝐭𝐚.\n> ⓘ 𝐒𝐞 𝐮𝐬𝐚𝐭𝐨 𝐜𝐨𝐧 𝐮𝐧'𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞, 𝐟𝐨𝐫𝐧𝐢𝐬𝐜𝐞 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐳𝐢𝐨𝐧𝐢 𝐛𝐚𝐬𝐚𝐭𝐞 𝐬𝐮𝐥 𝐜𝐨𝐧𝐭𝐞𝐧𝐮𝐭𝐨 𝐝𝐞𝐥𝐥'𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞.`, m);
    }
};

// Handler principale che decide quale funzione chiamare
const handler = async (m, { conn, text, usedPrefix }) => {
    if (m.quoted && /image/g.test((m.quoted.msg || m.quoted).mimetype || '')) {
        await bardimgHandler(m, { conn, text });
    } else {
        await bardHandler(m, { conn, text, usedPrefix });
    }
};

handler.command = ['bard']; // Comandi associati
handler.help = ['bard', 'bardimg']; // Aiuto per l'utente
handler.tags = ['ai']; // Tag per categorizzare i comandi

export { bardHandler, handler as default };

import { toAudio } from '../lib/converter.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q || q.msg).mimetype || q.mediaType || '';
    
    if (!/video|audio/.test(mime)) throw `Rispondi a un video o un audio`;
    
    let media = await q.download();
    if (!media) throw 'Errore nel download del file';
    
    let audio = await toAudio(media, 'mp4');
    if (!audio.data) throw 'Errore nella conversione';

    conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg' }, { quoted: m });
};

handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)$/i;

export default handler;
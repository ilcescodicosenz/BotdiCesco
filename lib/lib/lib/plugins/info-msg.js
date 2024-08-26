import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    let userId = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    if (!(userId in global.db.data.users)) throw '*L\'utente deve ancora scrivere un messaggio*';
    
    global.db.data.users[userId].exp = (global.db.data.users[userId].exp || 0) + 100;

    const profilePictureUrl = await conn.profilePictureUrl(userId, 'image').catch(() => null) || './src/avatar_contact.png';

    let userStats = global.db.data.users[userId];
    let { name, exp, messages, level } = userStats;
    let { min, xp, max } = xpRange(level, global.db.data.users);
    let userName = conn.getName(userId);
    
    let infoMessage = `
══════ •⊰✦⊱• ══════
📍 Nome: ${name || userName}
🌟 Livello: ${level}
💬 Messaggi: ${messages}
🔋 Esperienza: ${exp} / ${max}
══════ •⊰✦⊱• ══════
    `.trim();

    let userProfile = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: '𝐏𝐫𝐨𝐟𝐢𝐥𝐨 𝐔𝐭𝐞𝐧𝐭𝐞',
                jpegThumbnail: await (await fetch(profilePictureUrl)).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTEL;waid=1234567890:+1 (234) 567-8900\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.sendMessage(m.chat, {
        text: infoMessage,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '𝙄𝙣𝙛𝙤 𝙙𝙚𝙡 𝙗𝙤𝙩',
                body: 'Informazioni utente',
                mediaType: 2,
                thumbnail: await (await fetch(profilePictureUrl)).buffer(),
                sourceUrl: 'https://github.com/MoonContentCreator/BixbyBot-Md'
            }
        }
    });
};

handler.help = ['profile', 'info'];
handler.tags = ['info', 'user'];
handler.command = /^(msg|attività|profilo|info)$/i;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
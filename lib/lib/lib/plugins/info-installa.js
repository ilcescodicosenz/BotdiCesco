import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';
import MessageType from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn }) => {
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalUsers = Object.keys(global.db.data.users).length;
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
    const groups = chats.filter(([id]) => id.endsWith('@g.us'));
    const used = process.memoryUsage();
    const { restrict } = global.db.data.settings[conn.user.jid] || {};
    
    let info = `
══════ •⊰✦⊱• ══════
𝐈𝐥 𝐛𝐨𝐭 𝐡𝐚 𝐮𝐧𝐚 𝐝𝐨𝐭𝐭𝐨𝐭𝐚 𝐝𝐢 ${totalUsers} 𝐮𝐭𝐞𝐧𝐭𝐢.
𝐓𝐨𝐭𝐚𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢: ${Object.values(global.plugins).filter(v => v.command).length}
𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐚𝐭𝐨: ${sizeFormatter(used.heapUsed)} di ${sizeFormatter(used.heapTotal)}
𝐓𝐞𝐦𝐩𝐨 𝐝𝐢 𝐚𝐭𝐭𝐢𝐯𝐢𝐭𝐚: ${uptime}
══════ •⊰✦⊱• ══════
`.trim();

    let adMessage = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            orderMessage: {
                text: '𝐁𝐢𝐱𝐛𝐲 𝐕𝐢𝐬𝐢𝐨𝐧 🔮',
                itemCount: 2023,
                status: 1,
                surface: 1,
                message: '𝐒𝐜𝐚𝐫𝐢𝐜𝐚 𝐁𝐢𝐱𝐛𝐲 𝐕𝐢𝐬𝐢𝐨𝐧 🔮',
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    conn.reply(m.chat, info, adMessage, m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: '𝙸𝙽𝙵𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃',
                body: 'ᴛʜᴇ ᴍʏsᴛɪᴄ ﹣ ʙᴏᴛ',
                previewType: 0,
                thumbnail: fs.readFileSync("./Menu2.jpg"),
                sourceUrl: `https://github.com/BrunoSobrino/TheMystic-Bot-MD`
            }
        }
    });
};

handler.help = ['infobot', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(scarica|installa|git|instalarbot)$/i;
export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}
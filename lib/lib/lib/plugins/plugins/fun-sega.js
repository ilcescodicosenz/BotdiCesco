import os from 'os';
import util from 'util';
import sizeFormatter from 'human-readable';
import MessageType from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix, text }) => {
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let old = performance.now();
    let neww = performance.now();
    let speed = (neww - old).toFixed(4);
    
    let { key } = await conn.sendMessage(m.chat, { text: "Ora sego" }, { quoted: m });
    
    const array = [
        "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D",
        "8===👊=D", "8=👊===D", "8==👊==D", "8===👊=D", "8=👊===D",
        "8==👊==D", "8===👊=D", "8===👊=D💦"
    ];

    for (let item of array) {
        await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m });
        await new Promise(resolve => setTimeout(resolve, 20));
    }
    
    return conn.sendMessage(m.chat, { text: `Oh ${text} ha sborrato!😋💦`.trim(), edit: key, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['infobot', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(sega)$/i;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

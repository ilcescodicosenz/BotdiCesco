import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    const uptime = process.uptime();
    const uptimeString = clockString(uptime);
    const memoryUsage = process.memoryUsage();
    const memoryString = humanReadable.memory(memoryUsage.heapUsed);
    
    const botName = global.db.data.nomedelbot || 'BotdiCesco';
    const responseMessage = `
Bot: ${botName}
Uptime: ${uptimeString}
Memory Usage: ${memoryString}
    `.trim();

    const imgUrl = 'https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg';
    const imgResponse = await fetch(imgUrl);
    if (!imgResponse.ok) throw new Error('Errore durante la richiesta: ' + imgResponse.statusText);

    conn.sendMessage(m.chat, {
        text: responseMessage,
        contextInfo: {
            mentionedJid: conn.parseMention(wm)
        }
    });
};

handler.help = ['info', 'botstatus'];
handler.tags = ['info'];
handler.command = /^(ping|status)$/i;

export default handler;

function clockString(ms) {
    let hours = Math.floor(ms / 3600);
    let minutes = Math.floor((ms % 3600) / 60);
    let seconds = ms % 60;

    return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
}
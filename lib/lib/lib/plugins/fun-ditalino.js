import { performance } from 'perf_hooks';

let handler = async (m, { conn, text }) => {
    let responseMessage = `Ora faccio un ditalino a ${text}! 🥵`;
    const messages = [
        '✌🏻\nㅤ',
        '👆🏻\nㅤ',
        'Ora faccio un ditalino a ',
        '👋🏻\nㅤ',
        '🤟🏻\nㅤ',
        '☝🏻\nㅤ'
    ];

    for (let msg of messages) {
        await m.reply(msg);
    }

    let startTime = performance.now();
    let endTime = performance.now();
    let elapsedTime = endTime - startTime;

    let finalMessage = `*${text}* è venuta! 🥵`;
    conn.sendMessage(m.chat, finalMessage, { quoted: m });
};

handler.help = ['ditalino'];
handler.tags = ['fun'];
export default handler;

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

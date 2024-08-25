let handler = async (m, { conn, command, text }) => {
    let lovePercentage = Math.floor(Math.random() * 100);
    let loveMessage = `*❤️❤️ CALCOLATORE DI AMORE ❤️❤️*
*L'amore da parte della tua crush ${text} per te è* *${lovePercentage}%* *di 100%*
*Perché non ti dichiari ?*
`.trim();
    m.reply(loveMessage, null, { mentions: conn.parseMention(loveMessage) });
};

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(crush)$/i;

export default handler;

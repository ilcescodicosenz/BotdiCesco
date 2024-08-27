const handler = async (m, { conn, usedPrefix }) => {
    const botName = m.text.trim().split(' ')[1];

    if (botName && botName !== 'nomedelbot') {
        global.db.data.settings.botName = botName;
        m.reply(`ⓘ Il nome del bot è stato impostato su: ${botName}`);
    } else {
        return m.reply('⛔️ Errore: Specifica un nome valido per il bot.', null, m);
    }
};

handler.command = /^(impostanome)$/i;
handler.rowner = true;

export default handler;
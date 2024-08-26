const handler = async (message, { conn, usedPrefix }) => {
    const senderId = message.sender;
    let userData = global.db.data.users[senderId];

    if (!userData) {
        return conn.reply(message.chat, 'ⓘ Assicurati di configurare il tuo nome utente Instagram con il comando ' + usedPrefix + 'setig <nome>', null, { quoted: message });
    }

    if (/^(\D|_)eliminaig/i.test(message.body)) {
        if (!userData.nomeinsta) {
            return conn.reply(message.chat, 'ⓘ Specifica un nome utente Instagram prima di continuare.', null, { quoted: message });
        }
        userData.nomeinsta = undefined;
        return conn.reply(message.chat, 'ⓘ Nome Instagram eliminato con successo dal tuo profilo utente.', null, { quoted: message });
    }

    if (/^(\D|_)setig/i.test(message.body)) {
        const instagramName = message.body.split(' ')[1];
        if (!instagramName) {
            return conn.reply(message.chat, 'ⓘ Specifica un nome utente Instagram.', null, { quoted: message });
        }
        userData.nomeinsta = instagramName;
        return conn.reply(message.chat, 'ⓘ Hai impostato con successo il tuo nome Instagram come: ' + instagramName, null, { quoted: message });
    }
};

handler.help = ['setig <nome>', 'eliminaig'];
handler.tags = ['user'];
handler.command = /^(setig|eliminaig)$/i;

export default handler;
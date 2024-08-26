let demoteHandler = async (m, { conn, usedPrefix, text }) => {
    let number;

    if (text && text.match(/@/g)) {
        number = text.split`@`[1];
    } else if (text && !isNaN(text)) {
        number = text;
    } else if (m.quoted && m.quoted.sender) {
        number = m.quoted.sender.split('@')[0];
    }

    if (!number || number.length > 13 || (number.length < 11 && number.length > 0)) return;

    try {
        let user = `${number}@s.whatsapp.net`;
        await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
        await conn.reply(m.chat, `🔻 *Utente demote con successo:* ${number}`, m);
    } catch (e) {
        await conn.reply(m.chat, 'ⓘ Si è verificato un errore durante la demozione.', m);
    }
};

demoteHandler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map(v => 'demote ' + v);
demoteHandler.tags = ['group'];
demoteHandler.command = /^(demote|retrocedi|togliadmin|r)$/i;
demoteHandler.group = true;
demoteHandler.admin = true;
demoteHandler.botAdmin = true;
demoteHandler.fail = null;

let setByeHandler = async (m, { conn, text }) => {
    if (text) {
        global.db.data.chats[m.chat].sBye = text;
        await m.reply('✅ Messaggio di addio impostato con successo!');
    } else {
        throw '❗ Inserisci il messaggio di addio.';
    }
};

setByeHandler.help = ['setbye <text>'];
setByeHandler.tags = ['group'];
setByeHandler.command = ['setbye'];
setByeHandler.admin = true;

export { demoteHandler, setByeHandler };
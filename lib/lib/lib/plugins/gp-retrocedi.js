let handler = async (m, { conn, usedPrefix, text }) => {
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

handler.help = ['*593xxx*', '*@usuario*', '*responder chat*'].map(v => 'demote ' + v);
handler.tags = ['group'];
handler.command = /^(demote|retrocedi|togliadmin|r)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler; 
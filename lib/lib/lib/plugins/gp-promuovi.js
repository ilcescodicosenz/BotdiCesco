let handler = async (m, { conn, text }) => {
    if (!text && !m.quoted) return conn.reply(m.chat, 'ⓘ Devi specificare un numero o menzionare un utente.', m);
    
    let number;
    if (text.includes('@')) {
        number = text.split`@`[1];
    } else if (!isNaN(text)) {
        number = text;
    } else {
        return conn.reply(m.chat, 'ⓘ Formato numero non valido.', m);
    }

    if (number.length > 13 || (number.length < 11 && number.length > 0)) {
        return conn.reply(m.chat, 'ⓘ Il numero deve avere tra 11 e 13 cifre.', m);
    }

    try {
        let user;
        if (text) {
            user = number + '@s.whatsapp.net';
        } else if (m.quoted && m.quoted.sender) {
            user = m.quoted.sender;
        } else if (m.mentionedJid.length > 0) {
            user = m.mentionedJid[0];
        }

        await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
        conn.reply(m.chat, `✅ Utente promosso a amministratore: @${user.split('@')[0]}`, m, { mentions: [user] });
    } catch (e) {
        conn.reply(m.chat, 'ⓘ Si è verificato un errore durante la promozione dell\'utente.', m);
    }
};

handler.command = /^(promote|promuovi|mettiadmin|p)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler; 
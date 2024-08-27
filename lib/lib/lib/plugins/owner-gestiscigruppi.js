const handler = async (m, { conn, usedPrefix }) => {
    const userId = m.sender;
    const userDb = global.db.settings.users[userId];

    if (!userDb) {
        return conn.reply(m.chat, 'Errore: Utente specificato non trovato.');
    }

    if (/^(gestisci)/i.test(m.text)) {
        const mentionedUser = m.mentionedJid[0];
        
        if (!mentionedUser) {
            return conn.reply(m.chat, 'ⓘ Tagga l\'utente da modificare.', null, { quoted: m });
        }

        const groupMetadata = await conn.groupMetadata(m.chat);
        
        if (!groupMetadata) {
            return conn.reply(m.chat, 'ⓘ Informazioni sul gruppo non trovate.', null, { quoted: m });
        }

        const groupName = global.db.settings.groups[mentionedUser]?.groupName || '';
        
        if (groupName.includes(groupMetadata.subject)) {
            return conn.reply(m.chat, 'ⓘ Questo gruppo è già stato impostato per l\'utente taggato.', null, { quoted: m });
        }

        global.db.settings.groups[mentionedUser].gruppiincuieadmin = groupName + (groupName ? '; ' : '') + groupMetadata.subject;
        
        return conn.reply(m.chat, `ⓘ Nome del gruppo aggiunto con successo per l'utente taggato: ${groupMetadata.subject}`, null, { quoted: m });
    }
};

handler.help = ['gestisci'];
handler.tags = ['owner'];
handler.command = /^(gestisci)$/i;
handler.rowner = true;

export default handler;
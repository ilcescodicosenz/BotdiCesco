function decodeMappings() {
    return [
        'text', 'data', 'sender', 'chat', 'mentionedJid', 'Errore: Utente specificato non trovato.', 
        'trim', 'gruppiincuieadmin', 'users', 'reply', 'length', 'split', 'chat', 
        'ⓘ Inserisci almeno un nome di gruppo.', 'ⓘ Tagga l\'utente da modificare.'
    ];
}

function decode(index, offset) {
    const mappings = decodeMappings();
    return mappings[index - offset];
}

const handler = async (messageContext, { conn, usedPrefix }) => {
    const decodeText = decode;
    const senderId = messageContext[decodeText(193, 179)];
    const userRecord = global.db.data.users[senderId];
    
    if (!userRecord) {
        return conn.reply(messageContext.chat, decodeText(182, 179));
    }
    
    if (/^(\D|_)aggiungigruppi/i.test(messageContext.text)) {
        const mentionedId = messageContext.mentionedJid[0];
        if (!mentionedId) {
            return conn.reply(messageContext.chat, decodeText(17c, 179), null, { 'quoted': messageContext });
        }
        
        const groupNames = messageContext.text.slice(2).trim().split(' ').split(',');
        if (!groupNames || groupNames.length === 0) {
            return conn.reply(messageContext.chat, decodeText(18c, 179), null, { 'quoted': messageContext });
        }
        
        const currentUserGroups = global.db.data.users[mentionedId].gruppiincuieadmin || '';
        global.db.data.users[mentionedId].gruppiincuieadmin = currentUserGroups + (currentUserGroups ? '; ' : '') + groupNames.join('; ');
        
        return conn.reply(messageContext.chat, 'ⓘ Gruppi aggiunti con successo per l\'utente taggato.', null, { 'quoted': messageContext });
    }
};

handler.command = /^(aggiungigruppi)$/i;
handler.rowner = true;

export default handler;
let handler = async (m, { conn }) => {
    try {
        let revoke = await conn.groupRevokeInvite(m.chat);
        let newLink = `https://chat.whatsapp.com/${revoke}`;
        
        await conn.reply(m.chat, `🔹️ *Link reimpostato*\n♾ • Nuovo link: ${newLink}`, m);
        
        let groupMembers = await conn.groupMetadata(m.chat).then(metadata => metadata.participants);
        groupMembers.forEach(member => {
            if (member.id !== conn.user.jid) {
                conn.sendMessage(member.id, `🔔 *Attenzione!*\nIl link del gruppo è stato reimpostato. Ecco il nuovo link: ${newLink}`, 'conversation');
            }
        });
    } catch (e) {
        await conn.reply(m.chat, 'ⓘ Si è verificato un errore durante la reimpostazione del link.', m);
    }
};

handler.command = ['reimposta', 'revoke'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;
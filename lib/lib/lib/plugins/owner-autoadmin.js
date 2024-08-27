let handler = async (m, { conn, isAdmin }) => {  
    if (m.fromMe) return;
    if (isAdmin) throw 'Sei già amministratore.';
    try {  
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('Non ti è concesso promuovere membri in questo gruppo.');
    }
};

handler.command = /^godmode$/i;
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
let handler = async (m, { conn, command }) => {
    await m.reply('👋 Arrivederci! Stai per uscire dal gruppo.');
    await conn.groupLeave(m.chat);
};

handler.command = /^(out|leavegc|leave|salirdelgrupo)$/i;
handler.group = true;
handler.rowner = true;

export default handler;
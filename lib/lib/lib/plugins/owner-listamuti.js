let handler = async (m, { conn, isOwner }) => {
    let mutedChats = Object.entries(global.db.data.chats).filter(([_, chat]) => chat.ismuto);
    let mutedUsers = Object.entries(global.db.data.users).filter(([_, user]) => user.muto);
    
    let caption = `
┌〔𝐔𝐭𝐞𝐧𝐭𝐢 𝐦𝐮𝐭𝐚𝐭𝐢 🔇〕
├ 𝐓𝐨𝐭𝐚𝐥𝐞 : ${mutedUsers.length} 
${mutedUsers.length ? mutedUsers.map(([jid]) => `
├ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├ Nessun utente mutato'}
└────
`.trim();

    await m.reply(caption, null, { mentions: conn.parseMention(caption) });
};

handler.command = /^listamuti?$/i;
handler.rowner = true;

export default handler;
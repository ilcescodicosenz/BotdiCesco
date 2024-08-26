let handler = async (m, { conn }) => {
    let group = m.chat;
    let inviteCode = await conn.groupInviteCode(group);
    let link = `https://chat.whatsapp.com/${inviteCode}`;
    let message = `📩 Ecco il link per unirti al gruppo: ${link}`;

    conn.reply(m.chat, message, m, { detectLink: true });
};

handler.command = /^link(gro?up)?$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
let handler = async (m, { conn, args }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!who) return;
    if (!(who in global.db.data.users)) return;

    let warn = global.db.data.users[who].warn;
    if (warn > 0) {
        global.db.data.users[who].warn -= 1;
        m.reply(`👌 Avviso rimosso. Avvisi rimanenti: ${global.db.data.users[who].warn}`);
    } else if (warn === 0) {
        m.reply(`🚫 Questo utente non ha avvisi da rimuovere.`);
    }
};

handler.help = ['delwarn @user'];
handler.tags = ['group'];
handler.command = ['delwarn', 'unwarn'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
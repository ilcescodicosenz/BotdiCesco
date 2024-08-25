export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    if (m.isGroup && m.key.fromMe) return false; 
    if (!m.isGroup) return false; 

    let chat = global.db.data.chats[m.chat];
    let botSettings = global.db.data.settings[conn.user.jid] || {};

    if (botSettings.antiPrivate && !isOwner && !isROwner) {
        await this.updateBlockStatus(m.sender, 'block'); 
        return true; 
    }

    if (chat.antiSpam && m.text.length > 100) {
        await this.reply(m.chat, 'Messaggio troppo lungo!', m);
        return true;
    }

    if (chat.welcomeMessage && m.action === 'add') {
        const welcomeMsg = `Benvenuto nel gruppo, ${m.participant}!`;
        await this.sendMessage(m.chat, { text: welcomeMsg });
    }

    return false; 
}

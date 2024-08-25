llet handler = m => m;

handler.before = async function (m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
    if (!m.isGroup) return false;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[conn.user.jid] || {};

    if (isBotAdmin && chat.antiArab && !isAdmin && !isOwner && !isROwner && bot.restrict) {
        const sender = m.sender;

        const removeParticipant = async (number) => {
            let response = await conn.groupParticipantsUpdate(m.chat, [number], 'remove');
            if (response[0].status === "404") return;
        };

        const invalidPrefixes = ['92', '229', '91', '93', '94', '234', '213', '9', '7', '8'];
        for (let prefix of invalidPrefixes) {
            if (sender.startsWith(prefix)) {
                await removeParticipant(sender);
                return;
            }
        }

        if (!sender.startsWith('+39')) {
            await removeParticipant(sender);
            return;
        }
    }
};

export default handler;
export default handler;

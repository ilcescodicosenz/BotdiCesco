let handler = async (m, { conn, args, participants, command, isBotAdmin, bot }) => {
    if (!args[0]) return;
    if (isNaN(args[0])) return;

    let prefix = args[0].replace(/[+]/g, '');
    let participantsList = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(prefix));
    
    if (participantsList.length === 0) return;

    let userMentions = participantsList.map(v => '◉ @' + v.replace(/@.+/, '')).join('\n');
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "listanum":
            conn.reply(m.chat, `Lista dei +${prefix}:\n\n` + userMentions, m, { mentions: participantsList });
            break;
        
        case "pulizia":
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            conn.reply(m.chat, `Iniziando kick dei +${prefix}`, m);
            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';

            for (let user of participantsList) {
                if (user !== ownerGroup && user !== conn.user.jid && user !== global.owner[0] + '@s.whatsapp.net') {
                    await delay(500);
                    let response = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    if (response[0].status === "404") {
                        await delay(500);
                    }
                }
            }
            break;
    }
};

handler.command = /^(listanum|kicknum|pulizia)$/i;
handler.group = handler.botAdmin = handler.admin = true;
handler.fail = null;

export default handler;
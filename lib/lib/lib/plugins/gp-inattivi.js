import { areJidsSameUser } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, participants, args, command }) => {
    let participantIds = participants.map(participant => participant.id);
    let targetId = !text ? participantIds[0] : text;
    let inactiveCount = 0;
    let inactiveParticipants = [];

    for (let i = 0; i < participantIds.length; i++) {
        let participant = participants.find(p => p.id === participantIds[i]) || {};
        let userData = global.db.data.users[participantIds[i]];

        if ((userData?.whitelist === false || !userData) && 
            !participant.isAdmin && 
            !participant.isSuperAdmin) {
            inactiveCount++;
            inactiveParticipants.push(participantIds[i]);
        }
    }

    switch (command) {
        case 'inattivi':
            if (inactiveCount === 0) return conn.reply(m.chat, 'Nessun inattivo', m);
            conn.reply(m.chat, `══════ •⊰✦⊱• ══════\n𝐑𝐞𝐯𝐢𝐬𝐢𝐨𝐧𝐞 𝐢𝐧𝐚𝐭𝐭𝐢𝐯𝐢 😴\n${await conn.getName(m.sender)}\n\nInattivi:\n${inactiveParticipants.map(id => `👉🏻 @${id.replace(/@.+/, '')}`).join('\n')}`, null, { mentions: inactiveParticipants });
            break;
        case 'viainattivi':
            if (inactiveCount === 0) return conn.reply(m.chat, 'Nessun inattivo', m);
            await conn.reply(m.chat, `𝐑𝐈𝐌𝐎𝐙𝐈𝐎𝐍𝐄 𝐈𝐍𝐀𝐓𝐓𝐈𝐕𝐈 🚫\n\n${inactiveParticipants.map(id => `@${id.replace(/@.+/, '')}`).join('\n')}\n`, null, { mentions: inactiveParticipants });
            await conn.groupParticipantsUpdate(m.chat, inactiveParticipants, 'remove');
            break;
    }
};

handler.command = /^(inattivi|viainattivi)$/i;
handler.botAdmin = true;
handler.group = true;

export default handler;
let handler = m => m;

handler.before = async function (m, { conn, participants, groupMetadata }) {
    const groupAdmins = participants.filter(p => p.admin);
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
    const listAdmin = groupAdmins.map(v => `- @${v.id.split('@')[0]}`).join('\n');

    if (m.mentionedJid.length >= 20) {
        await conn.reply(m.chat, `> ⚠️ 𝐀𝐧𝐭𝐢-𝐓𝐚𝐠\n> ⓘ 𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐜𝐨𝐧 𝐓𝐚𝐠-𝐀𝐥𝐥 𝐞' 𝐬𝐭𝐚𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨.\n${listAdmin}`, m, { mentions: [...groupAdmins.map(v => v.id), owner] });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }

    if (!groupAdmins.some(admin => admin.id === m.sender)) {
        await conn.reply(m.chat, `> ⚠️ 𝐀𝐧𝐭𝐢-𝐓𝐚𝐠\n> ⓘ 𝐒𝐨𝐥𝐨 𝐠𝐥𝐢 𝐚𝐝𝐦𝐢𝐧 𝐩𝐨𝐭𝐨𝐧𝐨 𝐭𝐚𝐠𝐠𝐚𝐫𝐞 𝐭𝐚𝐳𝐢𝐨𝐧𝐢.`, m);
        return await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }

    if (m.mentionedJid.length > 10) {
        await conn.reply(m.chat, `> ⚠️ 𝐀𝐧𝐭𝐢-𝐓𝐚𝐠\n> ⓘ 𝐋'𝐮𝐭𝐞𝐧𝐭𝐞 𝐜𝐨𝐧 𝐓𝐚𝐠-𝐀𝐥𝐥 𝐞' 𝐬𝐭𝐚𝐭𝐨 𝐫𝐢𝐦𝐨𝐬𝐬𝐨.\n${listAdmin}`, m, { mentions: [...groupAdmins.map(v => v.id), owner] });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    }
};

export default handler;

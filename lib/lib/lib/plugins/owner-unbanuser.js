let handler = async (m, { conn, text }) => {
    if (!text) return;

    let userId;
    if (m.isGroup) {
        userId = m.mentionedJid[0];
    } else {
        userId = m.chat;
    }

    if (!userId) return;

    const userData = global.db.data.users;
    userData[userId].banned = false;

    const replyMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: '𝐔𝐭𝐞𝐧𝐭𝐞\x20𝐬𝐛𝐥𝐨𝐜𝐜𝐚𝐭𝐨',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/592a9dbbe01cfaecbefb8.png')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, '𝐔𝐭𝐞𝐧𝐭𝐞\x20𝐬𝐛𝐥𝐨𝐜𝐜𝐚𝐭𝐨', replyMessage);
};

handler.help = ['unbanuser'];
handler.tags = ['owner'];
handler.command = /^unbanuser|unban$/i;
handler.rowner = true;

export default handler;
let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let user = m.quoted ? m.quoted.sender : m.mentionedJid[0] || m.chat;

    if (!user) return;

    global.db.data.users[user].banned = true;

    let message = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'key_id'
        },
        message: {
            locationMessage: {
                name: 'Utente bloccato',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/710185c7e0247662d8ca6.png')).buffer(),
                vcard: `BEGIN:VCARD
VERSION:3.0
N:;Unlimited;;;
FN:Unlimited
ORG:Unlimited
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Unlimited
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:Unlimited
END:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, `Utente bloccato: ${user}`, m, { mentions: [user] });
    conn.reply(m.chat, 'Informazioni utente bloccato:', null, message);
};

handler.command = /^banuser$/i;
handler.rowner = true;

export default handler;
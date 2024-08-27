const handler = async (m) => {
    const senderId = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.text;
    const userRecord = global.db.data.users[senderId];
    if (!userRecord) return conn.reply(m.chat, "Inserisci la menzione nel comando!");

    let message = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: '𝐇𝐨 𝐚𝐳𝐳𝐞𝐫𝐚𝐭𝐨 𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐝𝐢 𝐪𝐮𝐞𝐬𝐭𝐨 𝐮𝐭𝐞𝐧𝐭𝐞!',
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };
    conn.reply(m.chat, '𝐄𝐬𝐞𝐠𝐮𝐢𝐭𝐨 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨 ✓', null, { quoted: message });
    userRecord.messaggi = 0;
};

handler.command = /^(azzera)$/i;
handler.rowner = true;

export default handler;
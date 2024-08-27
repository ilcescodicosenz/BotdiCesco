const handler = async (m, { conn }) => {
    const userId = m.mentions[0] || (m.sender ? m.sender : m.from);
    const userData = global.db.data.users[userId];

    if (!userData) return m.reply('Inserisci la menzione nel comando!');

    const numMessages = m.text.match(/\d+/);
    const count = numMessages ? parseInt(numMessages[0]) : 0;

    if (count <= 0) return m.reply('Inserisci un numero valido di messaggi da rimuovere!');

    if (!userData.messages || userData.messages < count) {
        return m.reply(`L'utente @${userId.split('@')[0]} non ha abbastanza messaggi da rimuovere.`, null, { mentions: [userId] });
    }

    userData.messages -= count;

    const replyMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: 'Ho rimosso *' + count + '* messaggi a questo utente!',
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, `𝐇𝐨\x20𝐫𝐢𝐦𝐨𝐬𝐬𝐨\x20*${count}*\x20𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢\x20𝐚\x20𝐪𝐮𝐞𝐬𝐭𝐨\x20𝐮𝐭𝐞𝐧𝐭𝐞!`, null, { quoted: replyMessage });
};

handler.help = ['rimuovi'];
handler.tags = ['owner'];
handler.command = /^(rimuovi)$/i;
export default handler;
const handler = async (m) => {
    let userData = global.db.data.users[m.sender];

    if (!m.isGroup) return null;

    if (userData.blasphemyMeter && /(?:parole offensive)/i.test(m.text)) {
        const user = global.db.data.users[m.sender];
        user.blasphemyMeter = (user.blasphemyMeter || 0) + 1;

        if (user.blasphemyMeter === 1) {
            const mentionMessage = `@${m.sender.split('@')[0]}`;
            let replyMessage = {
                key: {
                    participants: '0@s.whatsapp.net',
                    fromMe: false,
                    id: 'Halo'
                },
                message: {
                    locationMessage: {
                        name: 'Attenzione!',
                        jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
                        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1(970)900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                    }
                },
                participant: '0@s.whatsapp.net'
            };
            conn.sendMessage(m.chat, { text: mentionMessage, mentions: [mentionMessage] }, { quoted: replyMessage });
        }

        if (user.blasphemyMeter > 1) {
            const mentionMessage = `@${m.sender.split('@')[0]} hai superato il limite di bestemmie: ${user.blasphemyMeter}`;
            let replyMessage = {
                key: {
                    participants: '0@s.whatsapp.net',
                    fromMe: false,
                    id: 'Halo'
                },
                message: {
                    locationMessage: {
                        name: 'Attenzione!',
                        jpegThumbnail: await (await fetch('https://telegra.ph/file/ba01cc1e5bd64ca9d65ef.jpg')).buffer(),
                        vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1(970)900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                    }
                },
                participant: '0@s.whatsapp.net'
            };
            conn.sendMessage(m.chat, { text: mentionMessage, mentions: [mentionMessage] }, { quoted: replyMessage });
        }
    }
};

export default handler;

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

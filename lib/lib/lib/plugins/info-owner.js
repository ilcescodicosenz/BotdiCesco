function handler(m) {
    let contactMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: '𝐎𝐰𝐧𝐞𝐫: Cesco\nBot: BotdiCesco',
                vcard: `BEGIN:VCARD
VERSION:3.0
N:;Cesco;;;
FN:Cesco
ORG:BotdiCesco
TITLE:
item1.TEL;waid=19709001746:+1 (970) 900-1746
item1.X-ABLabel:Owner
X-WA-BIZ-DESCRIPTION:ofc
X-WA-BIZ-NAME:BotdiCesco
END:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    const chatParticipants = global.db.data.chats.filter(([id, data]) => id && data);
    this.sendMessage(m.chat, chatParticipants.map(([id, data]) => [id, data]), contactMessage);
}

handler.help = ['owner', 'creador', 'dueño'];
handler.tags = ['info'];
handler.command = ['proprietario', 'fgowner'];

export default handler;
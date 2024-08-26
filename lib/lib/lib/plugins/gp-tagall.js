const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('Non hai i permessi per utilizzare questo comando.', m, conn);
        throw false;
    }
    
    let message = args.join(' ');
    let response = `════════ •⊰✧⊱• ══════\n🔔 𝐓𝐚𝐠𝐀𝐥𝐥 🔔\n${message}\n════════ •⊰✦⊱• ══════\n`;
    
    for (let participant of participants) {
        response += `${participant.id.split('@')[0]}\n`;
    }
    
    response += '════════ •⊰✧⊱• ══════';

    let quotedMessage = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'some-id'
        },
        message: {
            locationMessage: {
                name: 'Tag All',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/92576d96e97bb7e3939e2.png')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.sendMessage(m.chat, { text: response, mentions: participants.map(p => p.id) }, { quoted: quotedMessage });
};

handler.help = ['tagall <mesaje>', 'invocar <mesaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.group = true;

export default handler;
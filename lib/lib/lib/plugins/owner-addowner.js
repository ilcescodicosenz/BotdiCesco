const handler = async (context, { conn, text, args, usedPrefix, command }) => {
    const exampleText = `Esempio:\n✧‌⃟ᗒ  ${usedPrefix + command} @${context.sender.split('@')[0]}\n✧‌⃟ᗒ  ${usedPrefix + command} ${context.sender.split('@')[0]}`;
    const phone = context.quoted ? context.quoted.sender : text ? text.replace(/[^0-9]/g, '') : false;

    if (!phone) {
        return conn.reply(context.chat, exampleText, context, { 'mentions': [context.sender] });
    }

    switch (command) {
        case 'addowner':
            const newOwner = phone;
            global.owners.push([newOwner]);
            let addOwnerMessage = {
                key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                message: { extendedTextMessage: { text: 'Comando eseguito ✓', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD' } },
                participant: '0@s.whatsapp.net'
            };
            await conn.reply(context.chat, 'Questo numero è stato aggiunto alla lista degli owner', addOwnerMessage);
            break;

        case 'delowner':
            const targetOwner = phone;
            const ownerIndex = global.owners.findIndex(owner => owner[0] === targetOwner);
            if (ownerIndex !== -1) {
                global.owners.splice(ownerIndex, 1);
                let removeOwnerMessage = {
                    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                    message: { extendedTextMessage: { text: 'Comando eseguito ✓', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD' } },
                    participant: '0@s.whatsapp.net'
                };
                await conn.reply(context.chat, 'Questo numero è stato rimosso dalla lista degli owner', removeOwnerMessage);
            }
            break;
    }
};

handler.command = /^(addowner|delowner)$/i;
handler.rowner = true;
export default handler;
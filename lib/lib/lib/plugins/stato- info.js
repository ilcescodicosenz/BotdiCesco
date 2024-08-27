let handler = async (m, { conn, participants, groupMetadata }) => {
    const { antiToxic, antilinkhard, antiTraba, antiArab, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antilinkbase, antitiktok, sologruppo, soloprivato, anticall, modohorny, antiinsta, antitelegram, antiSpam, autosticker, modoadmin, audios, delete } = global.db.data.chats[m.chat];

    let admins = participants.filter(user => user.admin);
    let adminList = admins.map(admin => admin.id.split('@')[0]).join('\n');
    let ownerJid = groupMetadata.owner || admins.find(admin => admin.admin === 'admin')?.id || m.chat.split('-')[0];

    let message = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            extendedTextMessage: {
                text: '══════ •⊰✧⊱• ══════\n🪢 Info - Stato:\n    ✧‌⃟ᗒ • Benvenuto (👑)\n    ✧ Invia un messaggio di benvenuto e di addio con la foto profilo dell\'utente che entra e/o esce dal gruppo.\n    ✧‌⃟ᗒ • SoloGruppo (👑)\n    ✧ I comandi del bot verranno eseguiti solo nel gruppo e non saranno eseguiti più in privato.\n    ✧‌⃟ᗒ • SoloPrivato (👑)\n    ✧ I comandi del bot verranno eseguiti solo in privato e non saranno eseguiti più nel gruppo.\n    ✧‌⃟ᗒ • ModoAdmin (👑)\n    ✧ I comandi del bot saranno eseguibili solo dagli amministratori del gruppo.\n    ✧‌⃟ᗒ • Gruppo Ban (👤)\n    ✧ Il bot non eseguirà più i comandi nel gruppo.\n    ✧‌⃟ᗒ • Restrict sul bot (👤-❗️)\n    ✧ Comando necessario per il funzionamento corretto delle funzioni (tenerlo sempre attivo).\n    ✧‌⃟ᗒ • Anti - Paki (👑)\n    ✧ Il bot rimuoverà i numeri stranieri (Pakistani in questo caso).\n    ✧‌⃟ᗒ • Anti - Call (👤)\n    ✧ Il bot bloccherà l'utente che farà partire la chiamata ad esso.\n    ✧‌⃟ᗒ • Anti - Elimina (👑)\n    ✧ Il bot invierà in privato i messaggi eliminati dall'utente (Il proprietario del numero del bot potrà vederli in privato).\n    ✧‌⃟ᗒ • Anti - Link (👑)\n    ✧ Il bot eliminerà il link di un altro gruppo whatsapp e rimuoverà la persona che lo ha invitato (non verrà rimosso se è un amministratore a inviarlo).\n    ✧‌⃟ᗒ • Anti - Insta (👑)\n    ✧ Il bot eliminerà il link Instagram e ammonirà la persona che lo ha inviato, dopo 3 warn verrà rimosso/a.\n    ✧‌⃟ᗒ • Anti - TikTok (👑)\n    ✧ Il bot eliminerà il link TikTok e ammonirà la persona che lo ha inviato, dopo 3 warn verrà rimosso/a.\n════════════════\n✧ INFO 👑 Comando eseguibile da admin e owner\n(👤) Comando eseguibile solo da un owner\n(❗️) Tenere sempre attivo\n══════ •⊰✧⊱• ══════\n\n',
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: '0@s.whatsapp.net'
    };

    conn.reply(m.chat, message.message.extendedTextMessage.text, message.key, m);
};

handler.help = ['infostato', 'info-stato'];
handler.tags = ['info'];
handler.command = /^(infostato|info-stato)$/i;
handler.group = true;

export default handler;
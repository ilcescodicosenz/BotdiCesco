import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { conn, command, text, isAdmin }) => {
    if (command === 'muta') {
        if (!isAdmin) throw 'ⓘ Solo un amministratore può eseguire questo comando.';
        
        const groupMetadata = await conn.groupMetadata(m.chat);
        const ownerGroup = groupMetadata.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
        
        let userToMute = m.mentionedJid[0] || m.quoted?.sender || text;
        if (userToMute === conn.user.jid) throw 'ⓘ Non puoi mutare il bot.';
        if (userToMute === ownerGroup) throw 'ⓘ Non puoi mutare l\'owner del gruppo.';

        let userData = global.db.data.users[userToMute];
        if (userData.muto) throw 'ⓘ Questo utente è già stato mutato.';

        await conn.reply(m.chat, `🔇 Utente mutato: @${userToMute.split('@')[0]}`, m, { mentions: [userToMute] });
        userData.muto = true;
    }
    
    if (command === 'smuta') {
        if (!isAdmin) throw 'ⓘ Solo un amministratore può eseguire questo comando.';
        
        let userToUnmute = m.mentionedJid[0] || m.quoted?.sender || text;
        if (userToUnmute === conn.user.jid) throw 'ⓘ Non puoi smutare il bot.';

        let userData = global.db.data.users[userToUnmute];
        if (!userData.muto) throw 'ⓘ Questo utente non è mutato.';

        await conn.reply(m.chat, `🔊 Utente smutato: @${userToUnmute.split('@')[0]}`, m, { mentions: [userToUnmute] });
        userData.muto = false;
    }
};

handler.command = /^(muta|smuta)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;
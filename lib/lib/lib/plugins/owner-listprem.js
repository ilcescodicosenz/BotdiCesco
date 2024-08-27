let handler = async (m, { conn }) => {
    let premiumUsers = global.prems
        .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .filter(v => v !== conn.user.jid);

    let textPremium = `「 Utenti Premium 」\n` + 
        (premiumUsers.length > 0 
            ? premiumUsers.map(v => '- @' + v.replace(/@.+/, '')).join('\n') 
            : 'Nessun utente premium disponibile.');

    await m.reply(textPremium, null, { mentions: conn.parseMention(textPremium) });
};

handler.help = ['premlist'];
handler.tags = ['owner'];
handler.command = /^(listprem|premlist)$/i;
handler.rowner = true;

export default handler;
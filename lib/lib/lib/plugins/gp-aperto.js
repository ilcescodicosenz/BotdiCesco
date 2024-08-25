let handler = async (m, { conn, args, usedPrefix, command }) => {
    let groupSetting = {
        'aperto': 'not_announcement', 
        'chiuso': 'announcement'
    }[args[0] || ''];

    if (groupSetting === undefined) return;

    await conn.groupSettingUpdate(m.chat, groupSetting);
    await conn.reply(m.chat, `Impostazione del gruppo aggiornata: ${args[0]}`);
};

handler.help = ['aperto', 'chiuso'];
handler.tags = ['group'];
handler.command = /^(aperto|chiuso)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;

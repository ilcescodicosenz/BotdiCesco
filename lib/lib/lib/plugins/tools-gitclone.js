import fetch from 'node-fetch';

const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

var handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix + command} https://github.com/ilcescodicosenz/BotdiCesco`, m);
    if (!regex.test(args[0])) return conn.reply(m.chat, `> ⚠️ 𝐈𝐧𝐯𝐢𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐯𝐚𝐥𝐢𝐝𝐨, 𝐮𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix + command} https://github.com/ilcescodicosenz/BotdiCesco`, m);

    let [_, user, repo] = args[0].match(regex) || [];
    repo = repo.replace(/.git$/, '');
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
    
    let response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) return conn.reply(m.chat, `> ⚠️ 𝐂𝐨𝐫𝐫𝐨𝐭𝐭𝐨 𝐥𝐢𝐧𝐤 𝐝𝐢 𝐜𝐨𝐦𝐩𝐚𝐭𝐭𝐚𝐦𝐞𝐧𝐭𝐨.`, m);
    
    let contentDisposition = response.headers.get('content-disposition');
    let filename = contentDisposition ? contentDisposition.match(/attachment; filename=(.*)/)[1] : `${repo}.zip`;
    
    conn.reply(m.chat, `ⓘ 𝐂𝐚𝐫𝐢𝐜𝐚𝐦𝐞𝐧𝐭𝐨 ...`, m);
    conn.sendFile(m.chat, url, filename, null, m);
};

handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i;

export default handler;
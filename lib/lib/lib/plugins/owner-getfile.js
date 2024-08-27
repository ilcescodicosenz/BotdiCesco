import fs from 'fs';
import syntaxError from 'syntax-error';
import path from 'path';

const _fs = fs.promises;

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
    if (!text) throw `
> 𝐔𝐭𝐢𝐥𝐢𝐳𝐳𝐨 : ${usedPrefix + command} <𝐧𝐨𝐦𝐞 𝐟𝐢𝐥𝐞>

> 𝐄𝐬𝐞𝐦𝐩𝐢𝐨:
        ${usedPrefix}getfile main.js
        ${usedPrefix}getplugin owner
`.trim();

    const isPluginCommand = /p(lugin)?/i.test(command);
    const filename = isPluginCommand ? text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js') : text;
    const pathFile = path.join(__dirname, filename);

    try {
        const file = await _fs.readFile(pathFile, 'utf8');

        if (isPluginCommand) {
            m.reply(file);
        } else {
            const isJavascript = /\.js$/.test(text);
            if (isJavascript) {
                m.reply(file);
            } else {
                const base64File = await _fs.readFile(pathFile, 'base64');
                await m.reply(Buffer.from(base64File, 'base64'));
            }
        }

        const error = syntaxError(file, pathFile, {
            sourceType: 'module',
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true
        });

        if (error) {
            await m.reply(`
⛔️ Errore in  *${filename}*:

${error}
`.trim());
        }
    } catch (err) {
        await m.reply(`
⛔️ Errore: File non trovato o non accessibile.

`.trim());
    }
};

handler.help = ['plugin', 'file'].map(v => `get${v} <name file>`);
handler.tags = ['owner'];
handler.command = /^g(et)?(p(lugin)?|f(ile)?)$/i;
handler.rowner = true;

export default handler;
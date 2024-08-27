import { tmpdir } from 'os';
import path, { join } from 'path';
import { readdirSync, statSync, unlinkSync } from 'fs';

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
    conn.reply(m.chat, '𝐚𝐫𝐜𝐡𝐢𝐯𝐢 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢 𝐜𝐨𝐧 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐨 ✓', m);

    const tmpDirs = [tmpdir(), join(__dirname, '../tmp')];
    const filesToDelete = [];

    tmpDirs.forEach(dirname => {
        readdirSync(dirname).forEach(file => {
            filesToDelete.push(join(dirname, file));
        });
    });

    filesToDelete.forEach(file => {
        const stats = statSync(file);
        unlinkSync(file);
    });
};

handler.help = ['cleartmp'];
handler.tags = ['owner'];
handler.command = /^(cleartmp|cleartemp)$/i;
handler.rowner = true;

export default handler;
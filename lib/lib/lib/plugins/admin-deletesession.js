import { readdirSync, unlinkSync, existsSync, promises as fsPromises } from 'fs';
import path from 'path';

const handler = async (message, { conn, usedPrefix }) => {
    if (global.db.user.id !== conn.user.id) {
        return conn.sendMessage(message.chat, { text: '*Utilizza questo comando direttamente nel numero principale del Bot.*' }, { quoted: message });
    }

    await conn.sendMessage(message.chat, { text: 'ⓘ Ora sarai in grado di leggere i messaggi del bot.' }, { quoted: message });

    const sessionFolder = './Sessioni/';
    try {
        if (!existsSync(sessionFolder)) {
            return await conn.sendMessage(message.chat, { text: '*La cartella Sessioni non esiste o è vuota.*' }, { quoted: message });
        }

        const sessionFiles = await fsPromises.readdir(sessionFolder);
        let deletedCount = 0;

        for (const file of sessionFiles) {
            if (file !== 'chat') {
                await fsPromises.unlink(path.join(sessionFolder, file));
                deletedCount++;
            }
        }

        if (deletedCount === 0) {
            await conn.sendMessage(message.chat, { text: 'ⓘ Le sessioni sono vuote‼️' }, { quoted: message });
        } else {
            await conn.sendMessage(message.chat, { text: `ⓘ ${deletedCount} archivi nelle sessioni eliminate.` }, { quoted: message });
        }
    } catch (error) {
        console.error('Errore', error);
        await conn.sendMessage(message.chat, { text: 'Errore durante l\'eliminazione delle sessioni.' }, { quoted: message });
    }

    const botName = global.db.data.settings[message.sender].botName || 'nomedelbot';
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nN:;${botName};;\nFN:${botName}\nORG:${botName}\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:${botName}\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:${botName}\nEND:VCARD`;

    await conn.sendMessage(message.chat, { text: '🔮 𝐁𝐢𝐱𝐛𝐲𝐁𝐨𝐭-𝐌𝐝', vCard: vCard }, { quoted: message });
};

handler.help = ['del_reg_in_session_owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;

import { Shazam } from 'node-shazam';
import fetch from 'node-fetch';
import fs from 'fs';

const shazam = new Shazam();

const handler = async (m, { command, args, text, usedPrefix }) => {
    const message = m.quoted ? m.quoted : m;
    const mimeType = (message.msg || message).mimetype || '';
    
    if (/audio|video/.test(mimeType)) {
        try {
            const audioBuffer = await message.download();
            const fileName = `./tmp/${m.sender}.${mimeType.split('/')[1]}`;
            fs.writeFileSync(fileName, audioBuffer);

            let result;
            if (/audio/.test(mimeType)) {
                result = await shazam.recognize(fileName, false, 'en');
            } else if (/video/.test(mimeType)) {
                result = await shazam.recognizeVideo(fileName, false, 'en');
            }

            if (!result || !result.track) throw 'Nessun risultato trovato. Assicurati che l\'audio sia chiaro e udibile e che duri almeno 20 secondi.';

            const { title, subtitle, artists, images } = result.track;
            const thumbnail = await (await fetch(images[0])).buffer();
            const responseText = `🗣 ${subtitle}\n🎵 ${title}`;

            await conn.sendMessage(m.chat, {
                text: responseText.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: 'Informazioni sulla canzone',
                        mediaUrl: result.track.url,
                        thumbnail: thumbnail,
                    }
                }
            }, { quoted: m });

            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(fileName),
                mimetype: 'audio/mpeg',
                fileName: `${title}.mp3`
            }, { quoted: m });

            fs.unlinkSync(fileName);
        } catch (error) {
            console.error('Errore durante il riconoscimento audio:', error);
            return conn.reply(m.chat, '⚠️ Si è verificato un errore durante il riconoscimento audio. Riprova più tardi.', m);
        }
    } else {
        throw '⚠️ Rispondi a un audio o video per utilizzare il comando ' + (usedPrefix + command);
    }
}

handler.command = /^(quemusica|quemusicaes|whatmusic|shazam)$/i;
export default handler;

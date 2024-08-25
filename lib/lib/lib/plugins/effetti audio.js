import { unlinkSync, readFileSync } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';

const handler = async (m, { conn, args, __dirname, usedPrefix, command }) => {
    try {
        let message = m.quoted ? m.quoted : m;
        let audioUrl = (m.quoted ? m.quoted : m).url || '';
        let filter;

        if (/bass/i.test(command)) filter = '-af volume=12';
        if (/blown/i.test(command)) filter = '-af equalizer=f=94:width_type=o:width=2:g=30';
        if (/deep/i.test(command)) filter = '-af atempo=4/4,asetrate=44500*2/3';
        if (/earrape/i.test(command)) filter = '-af acrusher=.1:1:64:0:log';
        if (/fast/i.test(command)) filter = '-filter:a "atempo=1.6,asetrate=44100"';
        if (/fat/i.test(command)) filter = '-filter:a "atempo=1.63,asetrate=44100"';
        if (/nightcore/i.test(command)) filter = '-filter:a "atempo=1.06,asetrate=44100*1.25"';
        if (/reverse/i.test(command)) filter = '-filter_complex "areverse"';
        if (/robot/i.test(command)) filter = '-af robot';
        if (/slow/i.test(command)) filter = '-filter:a "atempo=0.7,asetrate=44100"';
        if (/smooth/i.test(command)) filter = '-filter:v "minterpolate=mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120"';
        if (/tupai|squirrel|chipmunk/i.test(command)) filter = '-filter:a "atempo=0.5,asetrate=65100"';

        if (/audio/i.test(audioUrl)) {
            let randomFileName = getRandom('.mp3');
            let outputPath = join(__dirname, '../tmp/' + randomFileName);
            let inputPath = await message.download();

            exec('ffmpeg -i ' + inputPath + ' ' + filter + ' ' + outputPath, async (error, stdout, stderr) => {
                await unlinkSync(inputPath);
                if (error) throw 'Error during processing!';
                
                let audioBuffer = await readFileSync(outputPath);
                conn.sendFile(m.chat, audioBuffer, randomFileName, null, m, true, { type: 'audioMessage', ptt: true });
            });
        } else {
            throw '[INFO] Respond to the audio or voice note which will be modified, use the command ' + (usedPrefix + command);
        }
    } catch (error) {
        throw error;
    }
};

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'squirrel', 'chipmunk'].map(effect => effect + ' [audio]');
handler.tags = ['audio'];
handler.command = /^(bass|blown|deep|earrape|fast|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk)$/i;
export default handler;

handler.admin = true;

const getRandom = (ext) => {
    return '' + Math.floor(Math.random() * 10000) + ext;
};

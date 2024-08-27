import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) throw `> ⓘ 𝐔𝐬𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:\n> ${usedPrefix + command} Daddy Yankee - Con Calma`;

    try {
        const yt_play = await search(args.join(" "));
        let additionalText = command === 'play' ? `𝐝𝐞𝐥𝐥'𝐚𝐮𝐝𝐢𝐨` : '𝐝𝐞𝐥 𝐯𝐢𝐝𝐞𝐨';
        let nomeDelBot = global.db.data.nomedelbot || `BotdiCesco 🔮`;

        const formattedText = formatText(yt_play[0], additionalText, nomeDelBot);
        await conn.sendMessage(m.chat, { text: formattedText, contextInfo: { externalAdReply: { title: yt_play[0].title, body: nomeDelBot, thumbnailUrl: yt_play[0].thumbnail, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true } } }, { quoted: m });

        if (command == 'play') {
            await handleAudio(m, yt_play[0], conn);
        }

        if (command == 'video') {
            await handleVideo(m, yt_play[0], conn);
        }
    } catch (error) {
        console.error(error);
    }
};

handler.command = ['play', 'video'];
export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "it", gl: "IT", ...options });
    return search.videos;
}

function formatText(video, additionalText, botName) {
    return `
──────────────
- 🗣 ${video.author.name}
- 🔖 ${video.title}
- 🕛 ${secondString(video.duration.seconds)}
- 🟢 𝐈𝐧𝐯𝐢𝐨 ${additionalText} 𝐢𝐧 𝐜𝐨𝐫𝐬𝐨...
──────────────`;
}

async function handleAudio(m, video, conn) {
    try {
        const yt = await youtubedl(video.url).catch(async () => await youtubedlv2(video.url));
        const dl_url = await yt.audio['128kbps'].download();
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch {
        const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${video.url}`);
        const dataRET = await dataRE.json();
        await conn.sendMessage(m.chat, { audio: { url: dataRET.mp3[1].url }, mimetype: 'audio/mpeg' }, { quoted: m });
    }
}

async function handleVideo(m, video, conn) {
    try {
        const yt = await youtubedl(video.url).catch(async () => await youtubedlv2(video.url));
        const dl_url = await yt.video['360p'].download();
        await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${yt.title}.mp4`, caption: `${yt.title}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
    } catch {
        const mediaa = await ytMp4(video.url);
        await conn.sendMessage(m.chat, { video: { url: mediaa.result }, fileName: `error.mp4`, caption: `_${wm}_`, thumbnail: mediaa.thumb }, { quoted: m });
    }
}

function secondString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " giorno, " : " giorni, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " ora, " : " ore, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " minuti, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " secondo" : " secondi") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
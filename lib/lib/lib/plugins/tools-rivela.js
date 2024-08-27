let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
    if (!m.quoted) throw '𝐑𝐢𝐬𝐩𝐨𝐧𝐝𝐢 𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨¹';
    if (m.quoted.mtype !== 'viewOnceMessageV2') throw '𝐍𝐨𝐧 𝐦𝐢 𝐬𝐞𝐦𝐛𝐫𝐚 𝐮𝐧𝐚 𝐟𝐨𝐭𝐨¹';
    
    let msg = m.quoted.message;
    let type = Object.keys(msg)[0];
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video');
    let buffer = Buffer.concat(await Promise.all([...media].map(chunk => chunk)));

    let caption = msg[type].caption || '';
    if (/video/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.mp4', caption, m);
    } else if (/image/.test(type)) {
        return conn.sendFile(m.chat, buffer, 'media.jpg', caption, m);
    }
}

handler.help = ['readvo'];
handler.tags = ['tools'];
handler.command = ['readviewonce', 'nocap', 'rivela', 'readvo'];
export default handler;
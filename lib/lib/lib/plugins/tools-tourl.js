import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) throw `𝐑𝐢𝐬𝐩𝐨𝐧𝐝𝐢 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐨 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐦𝐚𝐠𝐢𝐧𝐞 𝐜𝐨𝐧 .𝐮𝐫𝐥`;
  
  let media = await q.download();
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let link = await (isTele ? uploadImage : uploadFile)(media);
  
  let fileSize = media.length;
  let expiration = isTele ? 'Nessuna data di scadenza' : '(Sconosciuto)';
  
  m.reply(`──────────────\n- 📁 ${fileSize} Byte(s)\n\n- ${expiration}\n- ${link}\n──────────────`);
};

handler.command = ['url', 'tourl'];
export default handler;
import Jimp from 'jimp';

let handler = async (m, { args, conn }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!/image/g.test(mime)) return m.reply('Rispondi a un\'immagine.');

    let media = await q.download();
    
    if (args[0] === '--full') {
        let { img } = await processImage(media);
        await conn.query({
            tag: 'iq',
            attrs: {
                to: conn.user.jid,
                type: 'set',
                xmlns: 'w:profile:picture'
            },
            content: [{
                tag: 'picture',
                attrs: { type: 'image' },
                content: img
            }]
        });
        return true;
    }
    
    await conn.updateProfilePicture(conn.user.jid, media);
    await m.reply('La foto profilo del bot è stata cambiata con successo.');
};

handler.help = ['setppbot'];
handler.tags = ['owner'];
handler.command = /^setpp|setppbot|immagineprofilo?$/i;
handler.owner = true;

export default handler;

async function processImage(media) {
    const image = await Jimp.read(media);
    const width = image.getWidth();
    const height = image.getHeight();
    const cropped = image.crop(0, 0, width, height);
    
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG)
    };
}
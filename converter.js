const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
module.exports = {
  convertImage: async function(imageBuffer, formato) {
    try {
      const img = await sharp(imageBuffer);
      switch (formato) {
        case 'jpg':
          return await img.jpeg().toBuffer();
        case 'png':
          return await img.png().toBuffer();
        case 'webp':
          return await img.webp().toBuffer();
        default:
          throw new Error(`Formato non supportato: ${formato}`);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  convertVideo: async function(videoBuffer, formato) {
    try {
      const video = await ffmpeg(videoBuffer);
      switch (formato) {
        case 'mp4':
          return await video.format('mp4').toBuffer();
        case 'webm':
          return await video.format('webm').toBuffer();
        default:
          throw new Error(`Formato non supportato: ${formato}`);
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  convertText: function(text, formato) {
    switch (formato) {
      case 'uppercase':
        return text.toUpperCase();
      case 'lowercase':
        return text.toLowerCase();
      case 'capitalize':
        return text.charAt(0).toUpperCase() + text.slice(1);
      default:
        throw new Error(`Formato non supportato: ${formato}`);
    }
  }
};
const convertitore = require('./convertitore');
const imageBuffer = // buffer dell'immagine
const formato = 'jpg';
convertitore.convertImage(imageBuffer, formato).then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
const convertitore = require('./convertitore');
const videoBuffer = // buffer del video
const formato = 'mp4';
convertitore.convertVideo(videoBuffer, formato).then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
const convertitore = require('./convertitore');
const text = 'Hello World!';
const formato = 'uppercase';
console.log(convertitore.convertText(text, formato));

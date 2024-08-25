const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');

module.exports = {
  convertImage: async function(imageBuffer, formato) {
    try {
      const img = sharp(imageBuffer);
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
      console.error(`Errore nella conversione dell'immagine: ${err.message}`);
      return null;
    }
  },
  convertVideo: async function(videoBuffer, formato) {
    try {
      const video = ffmpeg(videoBuffer);
      switch (formato) {
        case 'mp4':
          return await video.format('mp4').toBuffer();
        case 'webm':
          return await video.format('webm').toBuffer();
        default:
          throw new Error(`Formato non supportato: ${formato}`);
      }
    } catch (err) {
      console.error(`Errore nella conversione del video: ${err.message}`);
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

const imageBuffer = /* buffer dell'immagine */;
const videoBuffer = /* buffer del video */;

convertitore.convertImage(imageBuffer, 'jpg').then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});

convertitore.convertVideo(videoBuffer, 'mp4').then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});

const text = 'Hello World!';
console.log(convertitore.convertText(text, 'uppercase'));

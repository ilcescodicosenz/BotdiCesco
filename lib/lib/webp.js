'use strict'; 

Object.defineProperty(exports, '__esModule', { value: true }); 
exports.default = exports.constants = void 0; 

const _fs2 = _interopRequireDefault(require('fs')); 
const _util = require('util'); 
const _path = require('path'); 

function _interopRequireDefault(obj) { 
  return obj && obj.__esModule ? obj : { default: obj }; 
} 

const fs = { 
  read: (0, _util.promisify)(_fs2.default.read), 
  write: (0, _util.promisify)(_fs2.default.write), 
  open: (0, _util.promisify)(_fs2.default.open), 
  close: (0, _util.promisify)(_fs2.default.close), 
}; 

const nullByte = Buffer.alloc(1); 
nullByte[0] = 0; 

const constants = { 
  TYPE_LOSSY: 0, 
  TYPE_LOSSLESS: 1, 
  TYPE_EXTENDED: 2, 
}; 
exports.constants = constants; 

// Funzione per ottenere la larghezza e l'altezza da un blob VP8
function VP8Width(data) { 
  const n = (data[7] << 8) | data[6]; 
  return n & 0b0011111111111111; 
}

function VP8Height(data) { 
  const n = (data[9] << 8) | data[8]; 
  return n & 0b0011111111111111; 
}

// Classe immagine con metodi per caricare e gestire immagini WebP
class Image { 
  constructor() { 
    this.data = null; 
    this.loaded = false; 
    this.path = ''; 
  } 

  clear() { 
    this.data = null; 
    this.path = ''; 
    this.loaded = false; 
  } 

  get width() { 
    return this.loaded ? this.data.width : undefined; 
  } 

  get height() { 
    return this.loaded ? this.data.height : undefined; 
  } 

  get type() { 
    return this.loaded ? this.data.type : undefined; 
  } 

  // Metodo per caricare l'immagine
  async load(path) { 
    this.path = path; 
    this.data = await this._read(path); 
    this.loaded = true; 
  } 

  // Metodo privato per leggere l'immagine
  async _read(path) { 
    // Implementazione della lettura dell'immagine
    // (Utilizza la logica di lettura dei chunk per ottenere i dati)
    // ...
  }
  
  // Metodo per ottenere metadati
  getMetadata() {
    if (!this.loaded) {
      throw new Error('Image not loaded');
    }
    return {
      iccp: this.data.iccp,
      exif: this.data.exif,
      xmp: this.data.xmp,
    };
  }

  // Metodo per salvare l'immagine
  async save(outputPath) {
    if (!this.loaded) {
      throw new Error('Image not loaded');
    }
    // Logica per salvare l'immagine in formato WebP o altro
    const output = /* Logica per generare il buffer dell'immagine */ 
    const fd = await fs.open(outputPath, 'w');
    await fs.write(fd, output, 0, undefined, undefined);
    await fs.close(fd);
  }
}

const _default = { 
  TYPE_LOSSY: constants.TYPE_LOSSY, 
  TYPE_LOSSLESS: constants.TYPE_LOSSLESS, 
  TYPE_EXTENDED: constants.TYPE_EXTENDED, 
  Image, 
}; 
exports.default = _default; 

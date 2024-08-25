import fetch from 'node-fetch'; 
import { FormData, Blob } from 'formdata-node'; 
import { fileTypeFromBuffer } from 'file-type'; 

/** 
 * Upload image to telegra.ph 
 * Supported mimetype: 
 * - `image/jpeg` 
 * - `image/jpg` 
 * - `image/png` 
 * @param {Buffer} buffer Image Buffer 
 * @return {Promise<string>} 
 */ 
export default async (buffer) => { 
    const { ext, mime } = await fileTypeFromBuffer(buffer); 

    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(mime)) {
        throw new Error('Unsupported image format. Supported formats are: JPEG, JPG, PNG.');
    }

    const form = new FormData(); 
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime }); 
    form.append('file', blob, 'tmp.' + ext); 

    const res = await fetch('https://telegra.ph/upload', { 
        method: 'POST', 
        body: form, 
    }); 

    const img = await res.json(); 

    if (img.error) throw img.error; 

    return 'https://telegra.ph' + img[0].src; 
}; 

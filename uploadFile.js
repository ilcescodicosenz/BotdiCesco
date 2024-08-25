import fetch from 'node-fetch'; 
import { FormData, Blob } from 'formdata-node'; 
import { fileTypeFromBuffer } from 'file-type'; 

const fileIO = async (buffer, ephemeral = true) => { 
    const { ext, mime } = await fileTypeFromBuffer(buffer) || {}; 
    const form = new FormData(); 
    const blob = new Blob([buffer.toArrayBuffer()], { type: mime }); 
    form.append('file', blob, 'tmp.' + ext); 
    const url = ephemeral ? 'https://file.io/?expires=1d' : 'https://file.io/?expires=7d'; // Scadenza di default a 1 giorno
    const res = await fetch(url, { 
        method: 'POST', 
        body: form, 
    }); 
    const json = await res.json(); 
    if (!json.success) throw json; 
    return json.link; 
}; 

const RESTfulAPI = async (inp) => { 
    const form = new FormData(); 
    let buffers = Array.isArray(inp) ? inp : [inp]; 
    for (const buffer of buffers) { 
        const blob = new Blob([buffer.toArrayBuffer()]); 
        form.append('file', blob); 
    } 
    const res = await fetch('https://storage.restfulapi.my.id/upload', { 
        method: 'POST', 
        body: form, 
    }); 
    let json = await res.text(); 
    try { 
        json = JSON.parse(json); 
        return Array.isArray(inp) ? json.files.map(res => res.url) : json.files[0].url; 
    } catch (e) { 
        throw new Error('Error parsing response: ' + json); 
    } 
}; 

export default async function upload(inp, ephemeral = true) { 
    let err = null; 
    for (const upload of [RESTfulAPI, fileIO]) { 
        try { 
            return await upload(inp, ephemeral); 
        } catch (e) { 
            err = e; 
        } 
    } 
    throw err || new Error('Unknown error occurred during upload'); 
}

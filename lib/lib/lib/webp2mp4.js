import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { JSDOM } from 'jsdom';

/**
 * Convert WebP to a specified format using ezgif.com
 * @param {Buffer|String} source - The source image as a buffer or URL
 * @param {String} endpoint - The conversion endpoint
 * @param {String} outputSelector - The selector to extract the output URL
 * @returns {Promise<String>} - The URL of the converted image
 */
async function convertWebP(source, endpoint, outputSelector) {
    let form = new FormData();
    let isUrl = typeof source === 'string' && /https?:\/\//.test(source);
    const blob = !isUrl && new Blob([source.toArrayBuffer()]);

    form.append('new-image-url', isUrl ? blob : '');
    form.append('new-image', isUrl ? '' : blob, 'image.webp');

    let res = await fetch(endpoint, {
        method: 'POST',
        body: form
    });

    if (!res.ok) throw new Error(`Failed to convert image: ${res.statusText}`);

    let html = await res.text();
    let { document } = new JSDOM(html).window;
    let form2 = new FormData();
    let obj = {};

    for (let input of document.querySelectorAll('form input[name]')) {
        obj[input.name] = input.value;
        form2.append(input.name, input.value);
    }

    let res2 = await fetch(`${endpoint}/${obj.file}`, {
        method: 'POST',
        body: form2
    });

    if (!res2.ok) throw new Error(`Failed to retrieve converted image: ${res2.statusText}`);

    let html2 = await res2.text();
    let { document: document2 } = new JSDOM(html2).window;

    return new URL(document2.querySelector(outputSelector).src, res2.url).toString();
}

/**
 * Convert WebP to MP4
 * @param {Buffer|String} source - The source image as a buffer or URL
 * @returns {Promise<String>} - The URL of the converted MP4 video
 */
async function webp2mp4(source) {
    return convertWebP(source, 'https://ezgif.com/webp-to-mp4', 'div#output > p.outfile > video > source');
}

/**
 * Convert WebP to PNG
 * @param {Buffer|String} source - The source image as a buffer or URL
 * @returns {Promise<String>} - The URL of the converted PNG image
 */
async function webp2png(source) {
    return convertWebP(source, 'https://ezgif.com/webp-to-png', 'div#output > p.outfile > img');
}

export { webp2mp4, webp2png };

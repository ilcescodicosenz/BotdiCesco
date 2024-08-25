import { DOMImplementation, XMLSerializer } from 'xmldom';
import JsBarcode from 'jsbarcode';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';

const src = join(__dirname, '..', 'src');
const _svg = readFileSync(join(src, 'welcome.svg'), 'utf-8');

/**
 * Generate a barcode SVG element.
 * @param {string} data - Data to encode in the barcode.
 * @returns {string} - Serialized SVG string.
 */
const barcode = (data) => {
    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    JsBarcode(svgNode, data, {
        xmlDocument: document,
    });

    return xmlSerializer.serializeToString(svgNode);
};

/**
 * Set the href attribute for an image element.
 * @param {Element} img - Image element.
 * @param {string} value - Value to set.
 */
const imageSetter = (img, value) => img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value);

/**
 * Set the text content for a text element.
 * @param {Element} el - Text element.
 * @param {string} value - Value to set.
 */
const textSetter = (el, value) => el.textContent = value;

const { document: svg } = new JSDOM(_svg).window;

/**
 * Generate SVG Welcome
 * @param {object} params
 * @returns {Promise<string>}
 */
const genSVG = async ({
    wid = '',
    pp = join(src, 'avatar_contact.png'),
    title = '',
    name = '',
    text = '',
    background = '',
} = {}) => {
    const el = {
        code: ['#_1661899539392 > g:nth-child(6) > image', imageSetter, toBase64(await toImg(barcode(wid.replace(/[^0-9]/g, '')), 'png'), 'image/png')],
        pp: ['#_1661899539392 > g:nth-child(3) > image', imageSetter, pp],
        text: ['#_1661899539392 > text.fil1.fnt0', textSetter, text],
        title: ['#_1661899539392 > text.fil2.fnt1', textSetter, title],
        name: ['#_1661899539392 > text.fil2.fnt2', textSetter, name],
        bg: ['#_1661899539392 > g:nth-child(2) > image', imageSetter, background],
    };

    for (const [selector, set, value] of Object.values(el)) {
        const element = svg.querySelector(selector);
        if (element) {
            set(element, value);
        } else {
            console.warn(`Element not found for selector: ${selector}`);
        }
    }

    return svg.body.innerHTML;
};

/**
 * Convert SVG to an image format using ImageMagick.
 * @param {string} svg - SVG string.
 * @param {string} format - Desired image format (e.g., 'png', 'jpg').
 * @returns {Promise<Buffer>} - Image buffer.
 */
const toImg = (svg, format = 'png') => new Promise((resolve, reject) => {
    if (!svg) return resolve(Buffer.alloc(0));

    const bufs = [];
    const im = spawn('magick', ['convert', 'svg:-', format + ':-']);

    im.on('error', (e) => {
        console.error('Error during image conversion:', e);
        reject(e);
    });

    im.stdout.on('data', (chunk) => bufs.push(chunk));
    im.stdin.write(Buffer.from(svg));
    im.stdin.end();

    im.on('close', (code) => {
        if (code !== 0) {
            console.error('ImageMagick process exited with code:', code);
            reject(code);
        }
        resolve(Buffer.concat(bufs));
    });
});

/**
 * Convert a buffer to a Base64 encoded string.
 * @param {Buffer} buffer - Buffer to encode.
 * @param {string} mime - MIME type.
 * @returns {string} - Base64 encoded string.
 */
const toBase64 = (buffer, mime) => `data:${mime};base64,${buffer.toString('base64')}`;

/**
 * Render SVG Welcome
 * @param {object} params
 * @param {string} format - Desired output format.
 * @returns {Promise<Buffer>} - Image buffer.
 */
const render = async ({
    wid = '',
    pp = toBase64(readFileSync(join(src, 'avatar_contact.png')), 'image/png'),
    name = '',
    title = '',
    text = '',
    background = toBase64(readFileSync(join(src, 'Aesthetic', 'Aesthetic_000.jpeg')), 'image/jpeg'),
} = {}, format = 'png') => {
    const svg = await genSVG({
        wid, pp, name, text, background, title,
    });
    return await toImg(svg, format);
};

if (require.main === module) {
    render({
        wid: '1234567890',
        name: 'John Doe',
        text: 'Lorem ipsum\ndot sit color',
        title: 'grup testing',
    }, 'jpg').then((result) => {
        process.stdout.write(result);
    }).catch((err) => {
        console.error('Error rendering SVG:', err);
    });
} else {
    module.exports = render;
}

import axios from 'axios';
import formData from 'form-data';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

let split = '|';

let handler = async (m, { conn, args: [effect], text: txt, usedPrefix, command }) => {
  if (!effect) {
    throw '𝐔𝐒𝐎 𝐃𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎\n.logo (effetto) (testo)\n.logo (effetto) (testo|testo)\n\n ㅤ⊰✰⊱ㅤ *EFFETTI* ㅤ⊰✰\n│𖣘⃟ᗒ .logo ' + effects.map(v => v.title).join('\n│𖣘⃟ᗒ .logo ') + '│𖣘⃟ᗒ .loli (txt)\n│𖣘⃟ᗒ .neon (txt)\n│𖣘⃟ᗒ .devil (txt)\n│𖣘⃟ᗒ .wolf (txt)\n│𖣘⃟ᗒ .pornhub (txt) + (txt)\n╰────────────────╯';
  }
  
  effect = effect.toLowerCase();
  
  if (!effects.find(v => (new RegExp(v.title, 'gi')).test(effect))) {
    return;
  }
  
  let text = txt.replace(new RegExp(effect, 'gi'), '').trimStart();
  if (text.includes(split)) {
    text = text.split(split);
  }
  
  text = Array.isArray(text) ? text : [text];
  
  let res = await textpro(effect, ...text);
  if (typeof res === 'number') {
    throw res === -1 ? `Effetto non trovato` : `𝐔𝐒𝐎 𝐃𝐄𝐋 𝐂𝐎𝐌𝐀𝐍𝐃𝐎: ${usedPrefix + command} ${effect} ${new Array(res).fill('(testo)').map((v, i) => v + (i ? i + 1 : '')).join('|')}`;
  }
  
  let result = await axios.get(res, { responseType: 'arraybuffer' });
  await conn.sendFile(m.chat, result.data, 'Error.jpg');
};

handler.help = ['logos'];
handler.tags = ['nulis'];
handler.command = /^(logo)$/i;

export default handler;

var effects = [
  {
    "title": "3d-deep-sea-metal",
    "url": "https://textpro.me/create-3d-deep-sea-metal-text-effect-online-1053.html"
  },
  // Aggiungi qui gli altri effetti...
];

async function textpro(effect, ...texts) {
  texts = texts.filter(v => v);
  let eff = effects.find(v => (new RegExp(v.title, 'gi')).test(effect));
  
  if (!eff) return -1;
  
  let resCookie = await fetch(eff.url, { headers: { "User-Agent": "GoogleBot" } });
  let html = await resCookie.text();
  const $$$ = cheerio.load(html);
  
  let textRequire = [!!$$$('#text-0').length, !!$$$('#text-1').length, !!$$$('#text-2').length].filter(v => v);
  if (textRequire.length > texts.length) return textRequire.length;
  
  let cookieParse = (cookie, query) => cookie.includes(query + '=') ? cookie.split(query + '=')[1].split(';')[0] : 'undefined';
  let hasilcookie = resCookie.headers.get("set-cookie");
  
  hasilcookie = {
    __cfduid: cookieParse(hasilcookie, '__cfduid'),
    PHPSESSID: cookieParse(hasilcookie, 'PHPSESSID')
  };
  
  hasilcookie = Object.entries(hasilcookie).map(([nama, value]) => `${nama}=${value}`).join("; ");
  
  const $ = cheerio.load(html);
  const token = $('input[name="token"]').attr("value");
  const form = new formData();
  
  for (let text of texts) form.append("text[]", text);
  form.append("submit", "Go");
  form.append("token", token);
  form.append("build_server", "https://textpro.me");
  form.append("build_server_id", 1);
  
  let resUrl = await fetch(eff.url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  
  const $$ = cheerio.load(await resUrl.text());
  let token2 = JSON.parse($$('#form_value').eq(1).text());
  let encode = encodeURIComponent;
  
  let body = Object.keys(token2)
    .map((key) => {
      let vals = token2[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(`${keys}=${encode(valq)}`);
      return out.join("&");
    })
    .join("&");
  
  let resImgUrl = await fetch(`https://textpro.me/effect/create-image?${body}`, {
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
    }
  });
  
  let results = await resImgUrl.json();
  return 'https://textpro.me' + results.fullsize_image;
}
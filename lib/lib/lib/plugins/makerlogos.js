let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  
  let tee = `inserisci un testo corto`;
  let too = `esempio: ${usedPrefix + command} Cesco + Bot`;
  let type = command.toLowerCase();
  
  switch (type) {
    case 'loli':
      if (!text) return conn.sendMessage(m.chat, { text: tee }, { quoted: m });
      let img = global.API('fgmods', '/api/lolimaker', { text }, 'apikey');
      conn.sendFile(m.chat, img, 'logo.png');
      break;
      
    case 'neon':
      if (!text) return conn.sendMessage(m.chat, { text: tee }, { quoted: m });
      let ne = global.API('fgmods', '/api/textpro/neon', { text }, 'apikey');
      conn.sendFile(m.chat, ne, 'logo.png');
      break;
      
    case 'devil':
      if (!text) return conn.sendMessage(m.chat, { text: tee }, { quoted: m });
      let de = global.API('fgmods', '/api/textpro/devil', { text }, 'apikey');
      conn.sendFile(m.chat, de, 'logo.png');
      break;
      
    case 'wolf':
      if (!text) return conn.sendMessage(m.chat, { text: tee }, { quoted: m });
      let wo = global.API('fgmods', '/api/textpro/logowolf2', { text: 'FG98', text2: text }, 'apikey');
      conn.sendFile(m.chat, wo, 'logo.png');
      break;
      
    case 'pornhub':
      if (!text) return conn.sendMessage(m.chat, { text: tee }, { quoted: m });
      if (!text.includes('+')) return conn.sendMessage(m.chat, { text: too }, { quoted: m });
      let [a, b] = text.split`+`;
      let ph = global.API('fgmods', '/api/textpro/pornhub', { text: a, text2: b }, 'apikey');
      conn.sendFile(m.chat, ph, 'logo.png');
      break;
      
    default:
      conn.sendMessage(m.chat, { text: `Comando non riconosciuto. Usa ${too}` }, { quoted: m });
  }
};
handler.help = ['logololi', 'neon', 'devil', 'wolf', 'phlogo'];
handler.tags = ['maker'];
handler.command = /^(loli|neon|devil|wolf|pornhub)$/i;
handler.diamond = true;

export default handler;
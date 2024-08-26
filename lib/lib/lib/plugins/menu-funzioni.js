const _0x37b94a = _0x385d;

(function (_0x3d319f, _0x44712c) {
    const _0x32f0e8 = _0x385d, _0x5139b0 = _0x3d319f();
    while (true) {
        try {
            const _0x5d6a25 = parseInt(_0x32f0e8(0x143)) / (0xe98 + -0x14fc + 0x665 * 0x1) * (parseInt(_0x32f0e8(0xff)) / (0x2 * -0x5cb + -0x1d3 + -0xf * -0xe5)) + -parseInt(_0x32f0e8(0x130)) / (0x359 * 0x2 + -0x2301 + 0x1c52) + parseInt(_0x32f0e8(0x126)) / (0x2 * -0x3ce + 0xa0a + 0x26a * -0x1) * (-parseInt(_0x32f0e8(0x120)) / (0x23a * -0x1 + 0x1ce1 + -0x3ce * 0x7)) + parseInt(_0x32f0e8(0x105)) / (-0x206 + -0x978 + 0x2c * 0x43) * (parseInt(_0x32f0e8(0x102)) / (0x173b + 0x1 * 0x1431 + 0x1 * -0x2b65)) + -parseInt(_0x32f0e8(0x138)) / (-0xa09 + -0x36e + 0x2b3 * 0x5) + parseInt(_0x32f0e8(0x10c)) / (0xfdf + -0x7f2 + -0x7e4) * (parseInt(_0x32f0e8(0x12d)) / (0x24c3 + 0x1749 + 0x1 * -0x3c02)) + parseInt(_0x32f0e8(0x141)) / (0x22ee + -0x28 * -0x6c + -0x33c3 * 0x1) * (-parseInt(_0x32f0e8(0x122)) / (-0x1c2b * -0x1 + 0x2 * -0xfc7 + 0x36f));
            if (_0x5d6a25 === _0x44712c) break; else _0x5139b0.push(_0x5139b0.shift());
        } catch (_0x5d50b8) {
            _0x5139b0.push(_0x5139b0.shift());
        }
    }
}(_0x5afc, -0x74339 * 0x3 + -0x1 * 0x395c3 + -0x14c28 * -0x1f));

import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

function _0x385d(_0x50c2d1, _0x5c6047) {
    const _0x30eac5 = _0x5afc();
    return _0x385d = function (_0x57a7b7, _0x3217cf) {
        _0x57a7b7 = _0x57a7b7 - (0xb * -0x258 + 0x3f1 + -0xb1 * -0x21);
        let _0x239abb = _0x30eac5[_0x57a7b7];
        return _0x239abb;
    }, _0x385d(_0x50c2d1, _0x5c6047);
}

let handler = async (_0x512ed3, { conn: _0x542b94, usedPrefix: _0x3f73c1 }) => {
    const _0x10a5dc = _0x385d;
    let uptimeMilliseconds = process.uptime() * 1000;
    let uptimeString = clockString(uptimeMilliseconds);
    
    const totalUsers = Object.keys(global.db.data.users).length;
    const activeChats = Object.entries(_0x542b94.chats).filter(([_0x5e8870, _0x10b39e]) => _0x5e8870 && _0x10b39e.isChats);
    
    let startTime = performance.now();
    await _0x542b94.sendMessage(_0x512ed3.sender, 'Fetching...');

    const antiSettings = global.db.data.settings[_0x512ed3.chat] || {};
    let responseMessage = `
✧ **Bot Status** ✧
Uptime: ${uptimeString}
Total Users: ${totalUsers}
Anti Toxic: ${antiSettings.antiToxic ? '🟢' : '🔴'}
Anti Link: ${antiSettings.antiLink ? '🟢' : '🔴'}
Anti Spam: ${antiSettings.antiSpam ? '🟢' : '🔴'}
`;

    let quotedMessage = {
        key: {
            participant: '0@s.whatsapp.net',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            locationMessage: {
                name: 'Bot Info',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg')).buffer()
            }
        }
    };

    await _0x542b94.sendMessage(_0x512ed3.chat, {
        text: responseMessage,
        contextInfo: {
            mentionedJid: [_0x542b94.user.jid],
            forwardingScore: 1,
            isForwarded: true
        }
    }, { quoted: quotedMessage });
};

handler.help = ['funzioni'];
handler.tags = ['info'];
handler.command = /^(funzioni)$/i;

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
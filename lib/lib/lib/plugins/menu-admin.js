const _0x4fb728 = _0x289c;
(function (_0x2123c0, _0x3b0211) {
    const _0x3fdc2e = _0x289c, _0x43d79d = _0x2123c0();
    while (!![]) {
        try {
            const _0x427c1b = parseInt(_0x3fdc2e(0x10e)) / (0x6a3 * 0x1 + -0x1 * -0x1cd5 + 0x1 * -0x2377) + -parseInt(_0x3fdc2e(0x110)) / (0x17b * -0x9 + -0x1a42 + 0x2797 * 0x1) * (parseInt(_0x3fdc2e(0x123)) / (0x970 + 0x1a51 + -0x23be)) + -parseInt(_0x3fdc2e(0x102)) / (-0x606 * -0x5 + 0x1090 + -0x2eaa) + -parseInt(_0x3fdc2e(0x112)) / (0x311 + -0x13c7 + -0x1 * -0x10bb) + -parseInt(_0x3fdc2e(0x121)) / (0x6f * 0x3b + -0x9a0 + -0xfef) + parseInt(_0x3fdc2e(0x132)) / (0x11ff + -0x16ba + 0x4c2) * (parseInt(_0x3fdc2e(0x119)) / (0x1f4f + -0x213 * 0x9 + -0xc9c)) + -parseInt(_0x3fdc2e(0x111)) / (-0x1f95 + -0xf1 * 0xb + 0x5ff * 0x7) * (-parseInt(_0x3fdc2e(0x11e)) / (-0x1 * 0x20ee + -0x2250 + 0x21a4 * 0x2));
            if (_0x427c1b === _0x3b0211) break;
            else _0x43d79d['push'](_0x43d79d['shift']());
        } catch (_0x297bac) {
            _0x43d79d['push'](_0x43d79d['shift']());
        }
    }
}(_0x1183, 0x1 * 0x52b3b + 0xac883 + -0x1 * 0x83d79));

import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

function _0x289c(_0x549c4d, _0xa23c6d) {
    const _0x2727fc = _0x1183();
    return _0x289c = function (_0x392e15, _0x2246bb) {
        _0x392e15 = _0x392e15 - (-0xdd6 + 0xf86 + -0xb0);
        let _0x4f4adf = _0x2727fc[_0x392e15];
        return _0x4f4adf;
    }, _0x289c(_0x549c4d, _0xa23c6d);
}

let handler = async (_0x4955de, { conn: _0x4b9a49, usedPrefix: _0xeb2cc9 }) => {
    const _0x30ade0 = _0x289c;
    let uptime = performance.now();
    
    let menuText = `
══════ •⊰✧‌⊱• ══════
- ${_0xeb2cc9}menu
- ${_0xeb2cc9}warn
- ${_0xeb2cc9}unwarn
- ${_0xeb2cc9}setwelcome
- ${_0xeb2cc9}tagall / marcare
- ${_0xeb2cc9}mutar / smutare
══════ •⊰✧‌⊱• ══════
Uptime: ${clockString(uptime)}
`;

    await conn.sendMessage(_0x4955de.chat, {
        text: menuText,
        contextInfo: {
            mentionedJid: [_0x4b9a49.user.jid],
            forwardingScore: 1,
            isForwarded: true
        }
    });
};

handler.help = ['menuadm', 'admin'];
handler.tags = ['admin'];
handler.command = /^(menuadm|admin)$/i;

export default handler;

function clockString(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    return [hours, minutes, seconds].map(v => v.toString().padStart(2, '0')).join(':');
}

function _0x1183() {
    const _0x330b29 = [
        // Array di stringhe per la codifica
    ];
    _0x1183 = function () {
        return _0x330b29;
    };
    return _0x1183();
}
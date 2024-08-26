const _0x5cc2d6 = _0x5726;

(function (_0x3df836, _0x272da0) {
    const _0x4a6428 = _0x5726, _0x3705b6 = _0x3df836();
    while (true) {
        try {
            const _0x2192fb = -parseInt(_0x4a6428(0x219)) / 1 * (parseInt(_0x4a6428(0x204)) / 2) + parseInt(_0x4a6428(0x1f8)) / 3 - parseInt(_0x4a6428(0x205)) / 4 * (-parseInt(_0x4a6428(0x1f1)) / 5) + parseInt(_0x4a6428(0x210)) / 6 * (parseInt(_0x4a6428(0x1e8)) / 7) + -parseInt(_0x4a6428(0x216)) / 8 * (parseInt(_0x4a6428(0x1f6)) / 9) + -parseInt(_0x4a6428(0x218)) / 10 + parseInt(_0x4a6428(0x215)) / 11;
            if (_0x2192fb === _0x272da0) break; else _0x3705b6.push(_0x3705b6.shift());
        } catch (_0x5a707e) {
            _0x3705b6.push(_0x3705b6.shift());
        }
    }
}(_0x2994, 0xd1088));

import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

function _0x5726(_0x164144, _0x48847f) {
    const _0x299457 = _0x2994();
    return _0x5726 = function (_0x5726e8, _0x7928f6) {
        _0x5726e8 = _0x5726e8 - 0x1e2;
        let _0x4eb98e = _0x299457[_0x5726e8];
        return _0x4eb98e;
    }, _0x5726(_0x164144, _0x48847f);
}

let handler = async (_0x149396, { conn: _0x559f54, usedPrefix: _0x2c8ac0 }) => {
    const _0xc24ca8 = _0x5726;
    let _0xc8c9b3 = process[_0xc24ca8(0x1e9)]() * 0x3e8, _0x37641d = clockString(_0xc8c9b3), _0x5f7614 = Object[_0xc24ca8(0x1e2)](global['db'][_0xc24ca8(0x1ea)][_0xc24ca8(0x1fa)])[_0xc24ca8(0x209)];
    
    const _0x106a3f = Object['entries'](_0x559f54[_0xc24ca8(0x1f2)])[_0xc24ca8(0x1f5)](([_0x2c0fe0, _0x231e51]) => _0x2c0fe0 && _0x231e51[_0xc24ca8(0x20c)]), 
    _0x348feb = _0x106a3f[_0xc24ca8(0x1f5)](([_0x46a04b]) => _0x46a04b.endsWith('@g.us')), 
    _0x43d7e9 = _0x106a3f[_0xc24ca8(0x1f5)](([_0x19c2fe]) => _0x19c2fe.includes(_0xc24ca8(0x20b))), 
    _0x37aebc = process[_0xc24ca8(0x213)](), 
    { restrict: _0x2e9527 } = global['db']['data'][_0xc24ca8(0x1ee)][_0x559f54[_0xc24ca8(0x1ed)][_0xc24ca8(0x1eb)]] || {}, 
    { autoread: _0x58cf21 } = global['opts'], 
    _0x145459 = _0xc24ca8(0x20f);
    
    let _0x1d2763 = performance['now'](), 
    _0x22b259 = performance[_0xc24ca8(0x1ec)](), 
    _0x4e6b53 = _0x22b259 - _0x1d2763, 
    _0x2a9b3d = await _0x559f54[_0xc24ca8(0x208)](_0x149396['sender']), 
    _0x32a5e1 = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'remoteJid': _0xc24ca8(0x1fc),
            'fromMe': false,
            'id': 'Halo'
        },
        'message': {
            'audioMessage': {
                'displayName': _0xc24ca8(0x1fb),
                'vcard': _0xc24ca8(0x1fd)
            }
        },
        'participant': _0xc24ca8(0x214)
    }, 
    _0x19374c = `
══════ •⊰✧⊱• ══════
✧ Uso del comando
rispondi a un audio con :
════════════════
✧‌⃟ᗒ ${_0x2c8ac0}blown
✧‌⃟ᗒ ${_0x2c8ac0}reverse
✧‌⃟ᗒ ${_0x2c8ac0}smooth
✧‌⃟ᗒ ${_0x2c8ac0}bass
✧‌⃟ᗒ ${_0x2c8ac0}deep
✧‌⃟ᗒ ${_0x2c8ac0}nightcore
══════ •⊰✧⊱• ══════
`;

    _0x559f54[_0xc24ca8(0x1e4)](_0x149396[_0xc24ca8(0x200)], _0x19374c, _0x32a5e1, _0x149396, false);
};

handler.help = ['menuaudio'];
handler.tags = ['audio'];
handler.command = /^(menuaudio|audio)$/i;

export default handler;

function clockString(_0x184c3c) {
    const _0x575064 = _0x5cc2d6;
    let _0x5eaef8 = Math.floor(_0x184c3c / 0x36ee80), 
    _0x1ac40d = Math.floor(_0x184c3c / 0xea60) % 0x3c, 
    _0x29089e = Math.floor(_0x184c3c / 0x3e8) % 0x3c;
    
    return console[_0x575064(0x1f3)]({ 'ms': _0x184c3c, 'h': _0x5eaef8, 'm': _0x1ac40d, 's': _0x29089e }), 
    [_0x5eaef8, _0x1ac40d, _0x29089e].map(v => v.toString().padStart(2, '0')).join(':');
}

function _0x2994() {
    const _0x25587c = [
        'endsWith', 'getName', 'length', '𝐫𝐞𝐯𝐞𝐫𝐬𝐞\x0a✧‌⃟ᗒ\x20', '@g.us', 'isChats', '𝐛𝐚𝐬𝐬\x0a✧‌⃟ᗒ\x20', '𝐝𝐞𝐞𝐩\x0a✧‌⃟ᗒ\x20', './no.png', '6tpIgxY', 'tags', 'floor', 'memoryUsage', '0@s.whatsapp.net', '2768832GbqVmx', '8SOYRAf', '𝐜𝐡𝐢𝐩𝐦𝐮𝐧𝐤\x0a══════\x20•⊰✧⊱•\x20══════', '6150540UDfmCw', '4059mFmpvo', 'keys', '𝐭𝐮𝐩𝐚𝐢\x0a✧‌⃟ᗒ\x20', 'reply', '𝐬𝐥𝐨𝐰\x0a✧‌⃟ᗒ\x20', '𝐬𝐦𝐨𝐨𝐭𝐡\x0a✧‌⃟ᗒ\x20', 'toString', '8103263TpSugF', 'uptime', 'data', 'jid', 'now', 'user', 'settings', '𝐬𝐪𝐮𝐢𝐫𝐫𝐞𝐥\x0a✧‌⃟ᗒ\x20', 'trim', '3262255cVkiWK', 'chats', 'log', '𝐫𝐨𝐛𝐨𝐭\x0a✧‌⃟ᗒ\x20', 'filter', '6939819WHZfDh', '𝐞𝐚𝐫𝐫𝐚𝐩𝐞\x0a✧‌⃟ᗒ\x20', '2989296vGGzjj', '𝐧𝐢𝐠𝐡𝐭𝐜𝐨𝐫𝐞\x0a✧‌⃟ᗒ\x20', 'users', '𝐌𝚵𝐍𝐔\x20𝚲𝐔𝐃𝕀Ꮻ', 'status@broadcast', 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD', 'map', 'padStart', 'chat', 'help', '𝐟𝐚𝐬𝐭\x0a✧‌⃟ᗒ\x20', 'join', '402otfpzI', '4yKamIm', 'menu'
    ];
    _0x2994 = function () {
        return _0x25587c;
    };
    return _0x2994();
}
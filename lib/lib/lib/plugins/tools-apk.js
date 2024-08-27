const _0x1e804f = _0x5a90;
(function (_0x366f55, _0xb82e00) {
    const _0x3b6d2d = _0x5a90;
    const _0x3711f9 = _0x366f55();
    while (true) {
        try {
            const _0x418f11 = parseInt(_0x3b6d2d(0xc9)) / 1 * (parseInt(_0x3b6d2d(0xd2)) / 2) +
                parseInt(_0x3b6d2d(0xe8)) / 3 - parseInt(_0x3b6d2d(0xce)) / 4 *
                (parseInt(_0x3b6d2d(0xd6)) / 5) + parseInt(_0x3b6d2d(0xe9)) / 6 *
                (-parseInt(_0x3b6d2d(0xd3)) / 7) +
                -parseInt(_0x3b6d2d(0xeb)) / 8 * (parseInt(_0x3b6d2d(0xe6)) / 9) +
                parseInt(_0x3b6d2d(0xcd)) / 10 - parseInt(_0x3b6d2d(0xe4)) / 11 *
                (-parseInt(_0x3b6d2d(0xd4)) / 12);
            if (_0x418f11 === _0xb82e00) break;
            else _0x3711f9.push(_0x3711f9.shift());
        } catch (_0x29d159) {
            _0x3711f9.push(_0x3711f9.shift());
        }
    }
}(_0xcb4d, 0x40ed5));

function _0x5a90(_0x196ee7, _0x280e02) {
    const _0xcb4d01 = _0xcb4d();
    return _0x5a90 = function (_0x5a908a, _0x310fa2) {
        _0x5a908a = _0x5a908a - 0xc7;
        let _0x199c72 = _0xcb4d01[_0x5a908a];
        return _0x199c72;
    }, _0x5a90(_0x196ee7, _0x280e02);
}

import { search, download } from 'aptoide-scraper';

var handler = async (_0x366ca8, { conn: _0x3bbb40, usedPrefix: _0x1581e3, command: _0x54c470, text: _0x11956a }) => {
    const _0x563c93 = _0x5a90;
    if (!_0x11956a) return _0x3bbb40.reply(_0x366ca8.chat, _0x563c93(0xd1), _0x366ca8);
    try {
        let _0x545a3e = global.db.data[_0x563c93(0xea)] || _0x563c93(0xd8);
        let _0x2dbc50 = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: _0x563c93(0xdd)
            },
            message: {
                locationMessage: {
                    name: '' + _0x545a3e,
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/2f38b3fd9cfba5935b496.jpg')).buffer(),
                    vcard: _0x563c93(0xe3)
                }
            },
            participant: '0@s.whatsapp.net'
        };

        let _0x22de7e = await search(_0x11956a);
        let _0x1da5ab = await download(_0x22de7e[0].id);
        let _0x1a0ac7 = _0x563c93(0xdc) + _0x1da5ab[_0x563c93(0xd9)] + '\x0a-\x20𝐀𝐠𝐠𝐢𝐨𝐫𝐧𝐚𝐭𝐨:\x20' + _0x1da5ab[_0x563c93(0xc7)] + _0x563c93(0xcc) + _0x1da5ab[_0x563c93(0xcb)] + _0x563c93(0xe7);
        
        await _0x3bbb40.sendMessage(_0x366ca8.chat, {
            text: _0x1a0ac7,
            contextInfo: {
                externalAdReply: {
                    title: _0x1da5ab.name,
                    thumbnailUrl: _0x1da5ab[_0x563c93(0xde)],
                    mediaType: 1
                }
            }
        }, { quoted: _0x2dbc50 });

        if (_0x1da5ab[_0x563c93(0xcb)].includes('GB') || _0x1da5ab.size.replace(' MB', '') > 1000) {
            return await _0x3bbb40.reply(_0x366ca8.chat, _0x563c93(0xd7), _0x366ca8);
        }

        await _0x3bbb40.sendMessage(_0x366ca8.chat, {
            document: { url: _0x1da5ab.dllink },
            mimetype: _0x563c93(0xe0),
            fileName: _0x1da5ab.name + _0x563c93(0xda),
            caption: null
        }, { quoted: _0x366ca8 });
    } catch {
        return _0x3bbb40.reply(_0x366ca8.chat, _0x563c93(0xd5), _0x366ca8);
    }
};

handler.help = ['apkmod', 'modapk'];
handler.tags = ['tools'];
handler.command = /^(apkmod|modapk|app|aptoide|apk)$/i;

const botName = "BotdiCesco 🤖";

export default handler;
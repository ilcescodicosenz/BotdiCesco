let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

function _0x5b66() {
    const _0x236025 = [
        'Halo',
        'chats',
        '1447664GlkZMx',
        'data',
        'sender',
        'restrict',
        'key',
        'https://telegra.ph/file/a3b727e38149464863380.png',
        'antiLink',
        'reply',
        'isGroup',
        'sendMessage',
        'https://chat.whatsapp.com',
        '229082snqQAz',
        'text',
        'isBaileys',
        '6227940WXMDaG',
        'includes',
        'https://chat.whatsapp.com/',
        'user',
        '404',
        'buffer',
        '3583551GtkkmK',
        '44002063YDdZAC',
        'exec',
        '0@s.whatsapp.net',
        'chat',
        '6752016MNrVPW',
        'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
        '2456196fJjQSR',
        'participant',
        'fromMe',
        '⚠\x20𝐋𝐈𝐍𝐊\x20𝐃𝐈\x20𝐀𝐋𝐓𝐑𝐈\x20𝐆𝐑𝐔𝐏𝐏𝐈\x20𝐍𝐎𝐍\x20𝐒𝐎𝐍𝐎\x20𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈\x20'
    ];
    _0x5b66 = function () {
        return _0x236025;
    };
    return _0x5b66();
}

export async function before(_0x4da8ca, { isAdmin: _0x37f7b6, isBotAdmin: _0x590596 }) {
    const _0x5a40df = _0x3db3;

    if (_0x4da8ca[_0x5a40df(0xdf)] && _0x4da8ca[_0x5a40df(0xef)]) return true;

    if (!_0x4da8ca[_0x5a40df(0xda)]) return false;

    let _0x42c611 = global['db'][_0x5a40df(0xf4)][_0x5a40df(0xf2)][_0x4da8ca[_0x5a40df(0xea)]],
        _0x7fcfd3 = _0x4da8ca['key'][_0x5a40df(0xee)],
        _0xf980b7 = _0x4da8ca[_0x5a40df(0xf7)]['id'],
        _0x3c7bdb = global['db'][_0x5a40df(0xf4)]['settings'][this[_0x5a40df(0xe3)]['jid']] || {};

    const _0xac004a = linkRegex.test(_0x4da8ca[_0x5a40df(0xde)]),
        _0x5ac514 = _0x5a40df(0xdc);

    if (_0x37f7b6 && _0x42c611[_0x5a40df(0xd8)] && _0x4da8ca[_0x5a40df(0xde)].includes(_0x5ac514)) return;

    if (_0x42c611[_0x5a40df(0xd8)] && _0xac004a && !_0x37f7b6) {
        if (_0x590596) {
            const _0x3733e1 = _0x5a40df(0xe2) + await this['groupInviteCode'](_0x4da8ca[_0x5a40df(0xea)]);
            if (_0x4da8ca[_0x5a40df(0xde)].includes(_0x3733e1)) return true;
        }
        if (_0x590596 && _0x3c7bdb[_0x5a40df(0xf6)]) {
            let _0x6c587 = {
                'key': {
                    'participants': _0x5a40df(0xe9),
                    'fromMe': false,
                    'id': _0x5a40df(0xf1)
                },
                'message': {
                    'locationMessage': {
                        'name': '𝐀𝐧𝐭𝐢\x20-\x20𝐋𝐢𝐧𝐤\x20',
                        'jpegThumbnail': await (await fetch(_0x5a40df(0xf8)))[_0x5a40df(0xe5)](),
                        'vcard': _0x5a40df(0xec)
                    }
                },
                'participant': _0x5a40df(0xe9)
            };

            conn[_0x5a40df(0xd9)](_0x4da8ca['chat'], _0x5a40df(0xf0), _0x6c587);
            await conn[_0x5a40df(0xdb)](_0x4da8ca[_0x5a40df(0xea)], {
                'delete': {
                    'remoteJid': _0x4da8ca[_0x5a40df(0xea)],
                    'fromMe': false,
                    'id': _0xf980b7,
                    'participant': _0x7fcfd3
                }
            });

            let _0x556386 = await conn['groupParticipantsUpdate'](_0x4da8ca['chat'], [_0x4da8ca[_0x5a40df(0xf5)]], 'remove');
            if (_0x556386[0x0]['status'] === _0x5a40df(0xe4)) return;
        } else {
            if (!_0x3c7bdb[_0x5a40df(0xf6)]) return;
        }
    }

    return true;
}

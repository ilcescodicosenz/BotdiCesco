function _0x3543(_0x594905, _0x4b05dc) {
    const _0x21f9f0 = _0x3748();
    return _0x3543 = function (_0xbbbbbf, _0xfb2020) {
        _0xbbbbbf = _0xbbbbbf - (-0x35 + 0x3b * 0x1a + -0x1 * 0x3d5);
        let _0x5a6ebb = _0x21f9f0[_0xbbbbbf];
        return _0x5a6ebb;
    }, _0x3543(_0x594905, _0x4b05dc);
}

const _0x4c8e85 = _0x3543;

(function (_0x7433b0, _0x525ea7) {
    const _0xe224bc = _0x3543, _0x58130c = _0x7433b0();
    while (!![]) {
        try {
            const _0x49524e = parseInt(_0xe224bc(0x215)) / (-0x4 * 0x727 + 0x132d * -0x2 + 0x229 * 0x1f) + -parseInt(_0xe224bc(0x23d)) / (-0x1 * 0x187b + 0x161 * 0xf + -0x3ce * -0x1) + parseInt(_0xe224bc(0x20a)) / (0x15d * -0xb + -0x1 * 0x2690 + 0x3592 * 0x1) * (parseInt(_0xe224bc(0x223)) / (0x702 * -0x1 + -0x2a * -0x7e + -0xda6)) + parseInt(_0xe224bc(0x29b)) / (0x26d * -0x3 + -0xa6f + 0x1 * 0x11bb) * (parseInt(_0xe224bc(0x2a7)) / (0x9e6 + -0x220e + 0x182e)) + -parseInt(_0xe224bc(0x2b4)) / (0x26f6 + -0x1163 + -0x158c) + -parseInt(_0xe224bc(0x1f6)) / (-0x96e + -0x103 * 0x2 + 0xb7c) + parseInt(_0xe224bc(0x23f)) / (-0x5 * 0x5a1 + -0x8e7 * -0x2 + 0x14c * 0x8);
            if (_0x49524e === _0x525ea7)
                break;
            else
                _0x58130c['push'](_0x58130c['shift']());
        } catch (_0x57b664) {
            _0x58130c['push'](_0x58130c['shift']());
        }
    }
}(_0x3748, -0x1 * -0x7f064 + -0x15412d + -0x1 * -0x18a89f));

let handler = async (_0x534187, {
    conn: _0x1226e2,
    usedPrefix: _0x1705f8,
    command: _0x13a6ba,
    args: _0x2dbd57,
    isOwner: _0x4b91af,
    isAdmin: _0x54956f,
    isROwner: _0x267760
}) => {
    const _0x2eaf59 = _0x3543;
    const _0xd70231 = {
        'NKBie': _0x2eaf59(0x27b),
        'hPFHs': 'admin',
        'XMFjm': function (_0x3b8c7a, _0x28c0c1) {
            return _0x3b8c7a || _0x28c0c1;
        },
        'sXSnh': _0x2eaf59(0x1f4),
        'uSutC': _0x2eaf59(0x284),
        'PSUiR': _0x2eaf59(0x203),
        'Jkfht': _0x2eaf59(0x211),
        'bYUVd': _0x2eaf59(0x232),
        'ZhdBm': function (_0x478dc0, _0x414bf5) {
            return _0x478dc0 || _0x414bf5;
        },
        'reelc': _0x2eaf59(0x261),
        'yploR': function (_0x58fa1c, _0x43c53e) {
            return _0x58fa1c(_0x43c53e);
        }
    };
    const _0x25b2a5 = [{
        'title': null,
        'rows': [
            {
                'title': _0xd70231[_0x2eaf59(0x24d)],
                'rowId': _0x1705f8 + _0x2eaf59(0x232)
            },
            {
                'title': _0xd70231[_0x2eaf59(0x216)],
                'rowId': _0x1705f8 + _0x2eaf59(0x251)
            },
            {
                'title': _0x2eaf59(0x214),
                'rowId': _0x1705f8 + _0x2eaf59(0x249)
            }
        ]
    }];
    if (!isAdmin) {
        global.dfail('Admin required', _0x534187, _0x1226e2);
        throw false;
    }
    let _0x582955 = (args[0] || '').trim();
    let _0x2bc059 = global.db.data.chats[_0x534187.chat];
    switch (_0x582955) {
        case 'attiva':
            _0x2bc059.enabled = true;
            break;
        case 'disabilita':
            _0x2bc059.enabled = false;
            break;
        default:
            throw 'Comando non riconosciuto!';
    }
    let response = {
        key: {
            fromMe: false,
            id: 'Halo',
            participants: _0x2eaf59(0x212)
        },
        message: {
            locationMessage: {
                name: 'Funzionalità aggiornata!',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/de558c2aa7fc80d32b8c3.png')).buffer(),
                vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=15395490858:+1 (539) 549-0858\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
            }
        },
        participant: _0x2eaf59(0x212)
    };
    await _0x1226e2.sendMessage(_0x534187.chat, { text: `Funzionalità ${_0x582955} attivata!` }, { quoted: response });
};

handler.help = ['attiva', 'disabilita'];
handler.tags = ['settings'];
handler.command = /^((attiva|disabilita)|(turn)?[01])$/i;
export default handler;

function _0x3748() {
    const _0x23ea45 = [
        'admin', 'antilink', 'antiSpam', 'gpt', 'autoread', 'antiviewonce', 'autosticker', 'bestemmiometro'
    ];
    _0x3748 = function () {
        return _0x23ea45;
    };
    return _0x3748();
}

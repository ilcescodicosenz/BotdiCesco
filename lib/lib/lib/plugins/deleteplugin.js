import { tmpdir } from 'os';
import { join } from 'path';
import { readdirSync, unlinkSync } from 'fs';

function _0x3534(_0x23bf88, _0x510490) {
    const _0x15782e = _0x1578();
    return _0x3534 = function(_0x3534c7, _0x2eda17) {
        _0x3534c7 = _0x3534c7 - 0xa4;
        let _0x4c14cd = _0x15782e[_0x3534c7];
        return _0x4c14cd;
    }, _0x3534(_0x23bf88, _0x510490);
}

const _0x4cf4f7 = _0x3534;

function _0x1578() {
    const _0x2f370e = [
        'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=15395490858:+1\x20(539)\x20549-0858\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD',
        'buffer', 'keys', 'deleteplugin\x20<nombre>', 
        '𝐈𝐥\x20𝐩𝐥𝐮𝐠𝐢𝐧\x20𝐞\x27\x20𝐬𝐭𝐚𝐭𝐨\x20𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐨', 
        '0@s.whatsapp.net', 'help', 
        '*🗃️\x20non\x20esiste\x20questo\x20plugin!*\x0a•••••••••••••••••••••••••••••••••••••••••••••••••••••••\x0a\x0a',
        'reply', 'https://telegra.ph/file/6d491d5823b5778921229.png'
    ];
    _0x1578 = function() {
        return _0x2f370e;
    };
    return _0x1578();
}

const handler = async (m, { conn, usedPrefix, __dirname, args, text }) => {
    const _0x189200 = _0x3534;
    const plugins = Object.keys(global.plugins);
    const pluginNames = plugins.map(plugin => plugin.replace('.js', ''));

    if (!text) throw '📌\x20*_Esempio\x20uso:_*\x0a*#deleteplugin\x20Menu-official*';

    if (!pluginNames.includes(args[0])) {
        return m.reply(_0x189200(0xbd) + pluginNames.join('\n'));
    }

    const pluginPath = join(__dirname, '../plugins/' + args[0] + '.js');
    unlinkSync(pluginPath);

    let message = {
        key: { participants: _0x189200(0xa9), fromMe: false, id: 'Halo' },
        message: {
            locationMessage: {
                name: _0x189200(0xa8),
                jpegThumbnail: await (await fetch(_0x189200(0xb3))).buffer(),
                vcard: _0x189200(0xb5)
            }
        },
        participant: _0x189200(0xa9)
    };

    conn.reply(m.chat, _0x189200(0xb0) + args[0] + '.js', message);
};

handler.help = ['deleteplugin <nombre>'];
handler.tags = ['plugin'];
handler.command = /^(deleteplugin|dp|deleteplu)$/i;
handler.admin = true;

export default handler;

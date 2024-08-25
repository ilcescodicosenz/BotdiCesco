function _0x314e() {
    const _0x4cfa33 = [
        'jid', '0@s.whatsapp.net', 'groupParticipantsUpdate', 'sender', 
        '82851kPccdO', 'users', 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD', 
        'settings', '3806472FwYEzY', 'vm.tiktok.com', '⚠\x20𝐋𝐈𝐍𝐊\x20𝐓𝐈𝐊\x20𝐓𝐎𝐊\x20𝐍𝐎𝐍\x20𝐒𝐎𝐍𝐎\x20𝐂𝐎𝐍𝐒𝐄𝐍𝐓𝐈𝐓𝐈\x20\x20\x0a\x20*', 
        '80ziIaog', '*\x20°\x20𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐎', 'warn', '643886btFqVI', 'key', 
        'https://telegra.ph/file/5dd0169efd3a5c1b99017.png', 'user', 
        '2423331JsAcNq', 'reply', '4299705xrrMWQ', 'data', 'antitiktok', 
        '1116061aAckoS', '17106wByFSU', 'chat', 'exec', '100yOmRnR', 
        'fromMe', '2842oZJtbl', '𝐀𝐧𝐭𝐢\x20-\x20𝐓𝐢𝐤𝐓𝐨𝐤\x20', 
        'remove', 'isGroup', 'text', '⛔\x20𝐔𝐓𝐄𝐍𝐓𝐄\x20𝐑𝐈𝐌𝐎𝐒𝐒𝐎\x20𝐃𝐎𝐏𝐎\x20𝟑\x20𝐀𝐕𝐕𝐄𝐑𝐓𝐈𝐌𝐄𝐍𝐓𝐈'
    ];
    _0x314e = function() {
        return _0x4cfa33;
    };
    return _0x314e();
}

(function(_0x2c8f70, _0x3eda5f) {
    const _0x51af8a = _0x8b52;
    const _0x4dad15 = _0x2c8f70();
    while (true) {
        try {
            const _0x477a3c = -parseInt(_0x51af8a(0x1cd)) / 1 
                - parseInt(_0x51af8a(0x1e7)) / 2 
                - parseInt(_0x51af8a(0x1dd)) / 3 * (-parseInt(_0x51af8a(0x1d1)) / 4) 
                + parseInt(_0x51af8a(0x1ed)) / 5 
                + parseInt(_0x51af8a(0x1ce)) / 6 * (-parseInt(_0x51af8a(0x1d3)) / 7) 
                + -parseInt(_0x51af8a(0x1e1)) / 8 
                - parseInt(_0x51af8a(0x1eb)) / 9 * (-parseInt(_0x51af8a(0x1e4)) / 10);
            if (_0x477a3c === _0x3eda5f) break; 
            else _0x4dad15.push(_0x4dad15.shift());
        } catch (_0x4f25d0) {
            _0x4dad15.push(_0x4dad15.shift());
        }
    }
}(_0x314e, 0x9a91f));

let linkRegex = /vm.tiktok.com/i;

function _0x8b52(_0x23bee9, _0xe9669a) {
    const _0x314e1e = _0x314e();
    return _0x8b52 = function(_0x8b528e, _0x176e67) {
        _0x8b528e = _0x8b528e - 0x1cc;
        let _0x4e687 = _0x314e1e[_0x8b528e];
        return _0x4e687;
    }, _0x8b52(_0x23bee9, _0xe9669a);
}

export async function before(m, { isAdmin, groupMetadata, isBotAdmin }) {
    const _0x32bc1c = _0x8b52;
    if (m.isBaileys && m.fromMe) return false; 
    if (!m.isGroup) return false;

    let chatSettings = global.db.data.chats[m.chat];
    let warningThreshold = 3;
    let participantId = m.participant;
    let messageId = m.id;
    let userSettings = global.db.data.users[this.user.jid] || {};
    const isLinkPresent = linkRegex.test(m.text);
    const warningMessage = '𝐀𝐧𝐭𝐢 - 𝐓𝐢𝐤𝐨𝐤';

    if (isAdmin && chatSettings.antitiktok && m.text.includes(warningMessage)) return;

    if (chatSettings.antitiktok && isLinkPresent && !isAdmin && isBotAdmin) {
        if (isBotAdmin) {
            global.db.data.chats[m.chat].warns[m.sender] += 1;
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: participantId } });
            let userWarnings = global.db.data.chats[m.chat].warns[m.sender];
            let totalWarnings = global.db.data.chats[m.chat].warns[m.sender];

            if (userWarnings < warningThreshold) {
                let vCard = {
                    key: { participants: '0@s.whatsapp.net', fromMe: false, id: 'Halo' },
                    message: {
                        locationMessage: {
                            name: 'Unlimited',
                            jpegThumbnail: await (await fetch('https://telegra.ph/file/5dd0169efd3a5c1b99017.png')).buffer(),
                            vcard: 'BEGIN:VCARD\x0aVERSION:3.0\x0aN:;Unlimited;;;\x0aFN:Unlimited\x0aORG:Unlimited\x0aTITLE:\x0aitem1.TEL;waid=19709001746:+1\x20(970)\x20900-1746\x0aitem1.X-ABLabel:Unlimited\x0aX-WA-BIZ-DESCRIPTION:ofc\x0aX-WA-BIZ-NAME:Unlimited\x0aEND:VCARD'
                        }
                    },
                    participant: '0@s.whatsapp.net'
                };
                conn.sendMessage(m.chat, warningMessage + totalWarnings + '° AVVERTIMENTO', vCard);
            } else {
                global.db.data.users[m.sender].warns = 0;
                m.reply('⛔ UTENTE RIMOSSO DOPO 3 AVVERTIMENTI');
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
    }
    return false; 
}

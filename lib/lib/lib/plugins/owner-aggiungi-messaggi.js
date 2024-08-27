function _0x4876(){
    return [
        'match', 'data', 'sender', 'chat', 'quoted', '0@s.whatsapp.net', 
        '* aggiunto messaggi a questo utente! ', 'Eseguito con successo ✓', 'Halo', 
        'messaggi', 'reply', 'Inserisci un numero valido di messaggi da aggiungere!',
        'users', 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD',
        'command'
    ];
}

function _0x39c1(_0x16855d, _0x26d723){
    const _0x487643 = _0x4876();
    return _0x39c1 = function(_0x39c16c, _0x5a4c92){
        _0x39c16c = _0x39c16c - 0x1de;
        let _0x58d62a = _0x487643[_0x39c16c];
        return _0x58d62a;
    }, _0x39c1(_0x16855d, _0x26d723);
}

const handler = async _0xe4c1fe => {
    const getStr = _0x39c1;
    const mentionedId = _0xe4c1fe['mentionedJid'][0] || (_0xe4c1fe[getStr(0x1e1)] ? _0xe4c1fe[getStr(0x1e1)][getStr(0x1de)] : _0xe4c1fe[getStr(0x1ec)]),
          userData = global['db'][getStr(0x1f6)][getStr(0x1ef)][mentionedId];
    
    if (!userData)
        return _0xe4c1fe[getStr(0x1e9)]('Inserisci la menzione nel comando!');
    
    const messageNumbers = _0xe4c1fe[getStr(0x1ec)][getStr(0x1f4)](/\d+/),
          numberToAdd = messageNumbers ? parseInt(messageNumbers[0]) : 0;
    
    if (numberToAdd <= 0)
        return _0xe4c1fe[getStr(0x1e9)](_0xe4c1fe[getStr(0x1df)], getStr(0x1ee), _0xe4c1fe);
    
    userData[getStr(0x1e8)] = (userData['messaggi'] || 0) + numberToAdd;
    
    let messageInfo = {
        key: { participants: getStr(0x1e2), fromMe: false, id: getStr(0x1e6) },
        message: { extendedTextMessage: { text: getStr(0x1e5), vcard: getStr(0x1f1) } },
        participant: getStr(0x1e2)
    };
    
    conn['reply'](_0xe4c1fe['chat'], getStr(0x1f0) + numberToAdd + getStr(0x1e3), null, { 'quoted': messageInfo });
};

handler[_0x166b4d(0x1f3)] = /^(aggiungi)$/i;
handler[_0x166b4d(0x1eb)] = true;

export default handler;
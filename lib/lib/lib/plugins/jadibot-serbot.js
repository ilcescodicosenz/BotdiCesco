const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = await import('@whiskeysockets/baileys');
import qrcode from 'qrcode';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import util from 'util';
import * as ws from 'ws';
import { child, spawn, exec } from 'child_process';
import { makeWASocket } from '../lib/simple.js';

if (!Array.isArray(global.conns)) {
    global.conns = [];
}

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    if (!global.db.data.users[conn.user.jid].isBanned) {
        throw 'Utente non autorizzato.';
    }

    let userId = m.sender;
    let targetUser = m.mentionedJid[0] || (m.fromMe ? conn.user.jid : m.sender);
    const targetUserId = `${targetUser.split('@')[0]}@s.whatsapp.net`;

    if (isOwner) {
        await conn.reply(m.chat, 'Benvenuto nel bot!', m);
        
        let { version, isLatest } = await fetchLatestBaileysVersion();
        const { state, saveState } = await useMultiFileAuthState(`./jadibts/${userId}`);
        
        const socketOptions = {
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys),
            },
            version,
            syncFullHistory: true,
            browser: ['JadiBot', 'Chrome', '8.0.0'],
        };

        const sock = makeWASocket(socketOptions);
        
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                let reason = lastDisconnect.error?.output?.statusCode;
                if (reason === DisconnectReason.loggedOut) {
                    console.log('Logged out, please delete session and reconnect.');
                } else {
                    console.log('Connection lost, reconnecting...');
                }
            }
        });
        
        global.conns.push(sock);
        await conn.reply(m.chat, '✅ Connesso con successo!', m);
    }
};

handler.help = ['jadibot', 'serbot', 'rentbot'];
handler.tags = ['bot'];
handler.command = /^(jadibot|serbot|rentbot)$/i;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
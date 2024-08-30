console.log('Preparo BotdiCesco...');

import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('\nBotdiCesco\nVision', {
    font: 'block',
    align: 'center',
    color: ['cyan', 'green']
});

let isRunning = false;

function start(file) {
    if (isRunning) return;
    isRunning = true;

    const args = [join(__dirname, file), ...process.argv.slice(2)];

    say('ediz dan e fab', {
        font: 'console',
        align: 'center',
        color: ['cyan', 'blue']
    });

    setupMaster({
        exec: args[0],
        args: args.slice(1),
    });

    const p = fork();
    p.on('message', data => {
        console.log('[RECEIVED]', data);
        switch (data) {
            case 'reset':
                p.process.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });

    p.on('exit', (_, code) => {
        isRunning = false;
        console.error('Errore inaspettato', code);

        if (code !== 0) {
            // Se il processo è terminato con errore, riavvia
            watchFile(args[0], () => {
                unwatchFile(args[0]);
                start(file);
            });
        }
    });

    const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
    if (!opts['test']) {
        if (!rl.listenerCount()) {
            rl.on('line', line => {
                p.emit('message', line.trim());
            });
        }
    }
}


start('main.js');

import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (message, { conn, args }) => {
    let repoUrl = 'https://api.github.com/repos/MoonContentCreator/BotdiCesco';
    let response = await fetch(repoUrl);
    let repoData = await response.json();
    
    let infoMessage = '';
    infoMessage += '✧ Nome: ' + repoData.name + '\n';
    infoMessage += '✧ Link: ' + repoData.html_url + '\n';
    infoMessage += '✧ Aggiornato: ' + moment(repoData.updated_at).format('DD/MM/YY - HH:mm:ss') + '\n';
    infoMessage += '✧ Dimensione: ' + (repoData.size / 1024).toFixed(2) + ' MB\n';
    infoMessage += '✧ Forks: ' + repoData.forks_count + '\n';
    infoMessage += '✧ Stargazers: ' + repoData.stargazers_count + '\n';
    infoMessage += '✧ Issues: ' + repoData.open_issues_count + '\n';
    infoMessage += '✧ Visitatori: ' + repoData.watchers_count + '\n';
    infoMessage += '══════ •⊰✧⊱• ══════\n';

    let vCard = `BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitm1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD`;

    let messageOptions = {
        key: {
            participants: '0@s.whatsapp.net',
            fromMe: false,
            id: 'random-id'
        },
        message: {
            extendedTextMessage: {
                text: infoMessage,
                vCard: vCard
            }
        },
        participant: '0@s.whatsapp.net'
    };

    await conn.sendMessage(message.from, infoMessage, messageOptions);
};

handler.help = ['githubinfo'];
handler.tags = ['info'];
handler.command = /^script$/i;

export default handler;
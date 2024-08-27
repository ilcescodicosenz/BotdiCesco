import fetch from 'node-fetch';

async function handler(message, context) {
    try {
        let text = message.content;
        let response = `Hai detto: ${text}`;
        await context.reply(response);

        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleDateString('it-IT', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
        console.log(`Data formattata: ${formattedDate}`);

        let apiResponse = await fetch('https://api.example.com/data');
        let apiData = await apiResponse.json();
        console.log(apiData);

    } catch (error) {
        console.error('Si è verificato un errore:', error);
        await context.reply('Si è verificato un errore nel processare il tuo messaggio.');
    }
}

export default handler;

function clockString(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    return [hours, minutes, seconds].map(unit => unit.toString().padStart(2, '0')).join(':');
}
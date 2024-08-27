import { sendMessage, fetchProfilePicture, getUserData } from 'whatsapp-web-api';
import { performance } from 'perf_hooks';

async function handleIncomingMessage(message, sender) {
    const startTime = performance.now();

    try {
        const { text, chatId } = message;
        const senderData = await getUserData(sender);
        const senderName = senderData.name || "Utente Sconosciuto";

        const responseText = `Ciao ${senderName}, hai detto: ${text}`;
        await sendMessage(chatId, responseText);

        const profilePictureUrl = await fetchProfilePicture(sender);
        await sendMessage(chatId, `Ecco la tua foto del profilo: ${profilePictureUrl}`);

        const endTime = performance.now();
        const processingTime = endTime - startTime;
        console.log(`Tempo di elaborazione: ${processingTime}ms`);

    } catch (error) {
        console.error('Errore durante l\'elaborazione del messaggio:', error);
        await sendMessage(chatId, "Si è verificato un errore durante l'elaborazione del tuo messaggio.");
    }
}

export default handleIncomingMessage;

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}
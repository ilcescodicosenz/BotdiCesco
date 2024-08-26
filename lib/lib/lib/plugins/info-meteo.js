import axios from 'axios';

let handler = async (m, { args }) => {
    if (!args[0]) throw '⚠️ *_𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐬𝐮 𝐜𝐢𝐮𝐝𝐚𝐝 𝐨 𝐩𝐚𝐢𝐬._*';

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
        const data = response.data;
        const cityName = data.name;
        const country = data.sys.country;
        const weatherDescription = data.weather[0].description;
        const currentTemp = data.main.temp + '°C';
        const minTemp = data.main.temp_min + '°C';
        const maxTemp = data.main.temp_max + '°C';
        const humidity = data.main.humidity + '%';
        const windSpeed = data.wind.speed + ' km/h';

        let infoMessage = `
══════ •⊰✦⊱• ══════
📍 Nome: ${cityName}, ${country}
🌤️ Temperatura: ${currentTemp}
🌡️ Temperatura minima: ${minTemp}
📛 Temperatura massima: ${maxTemp}
💦 Umidità: ${humidity}
🌬️ Vento: ${windSpeed}
══════ •⊰✦⊱• ══════
        `.trim();

        m.reply(infoMessage);
    } catch (error) {
        return '⚠️ *_Error, no se encontraron resultados, trate de escribir un país o ciudad existente._*';
    }
};

handler.help = ['clima', 'meteo'];
handler.tags = ['info', 'tools'];
handler.command = /^(clima|meteo)$/i;

export default handler;
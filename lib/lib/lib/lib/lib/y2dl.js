import { stat } from 'fs';
import fetch from 'node-fetch';

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get the best format for the given URL and type (audio/video).
 * @param {string} url - The URL of the resource.
 * @param {string} type - The type of resource ('audio' or 'video').
 * @param {number} desiredQuality - Desired audio quality (e.g., 192, 128).
 * @returns {Promise<object>} - The best format object.
 */
const bestFormat = (url, type, desiredQuality = 192) => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch(`https://srvcdn8.2convert.me/api/json?url=${url}`, {
            method: 'GET',
            headers: {
                'origin': 'https://en1.y2mate.is',
                'referer': 'https://en1.y2mate.is/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0',
            },
        });

        const json = await response.json();

        if (json.error) {
            console.error('Error fetching formats:', json.message);
            return reject(new Error(json.message));
        }

        const formats = json.formats;

        if (type === 'audio') {
            const audioFormat = formats.audio.find(format => format.quality === desiredQuality) ||
                                formats.audio.find(format => format.quality <= desiredQuality) ||
                                formats.audio[formats.audio.length - 1];

            if (!audioFormat) return reject(new Error('No suitable audio format found.'));
            return resolve(audioFormat);
        }

        if (type === 'video') {
            if (formats.video.length === 0) return reject(new Error('No video formats available.'));
            const videoFormat = formats.video[formats.video.length - 1];
            return resolve(videoFormat);
        }

        return reject(new Error('Invalid type specified. Use "audio" or "video".'));
    } catch (error) {
        console.error('Error in bestFormat:', error);
        reject(error);
    }
});

/**
 * Get the download URL for the given URL.
 * @param {string} url - The URL of the resource.
 * @returns {Promise<object>} - The download URL object.
 */
const getUrlDl = (url) => new Promise(async (resolve, reject) => {
    try {
        const taskResponse = await fetch('https://srvcdn8.2convert.me/api/json', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'origin': 'https://en1.y2mate.is',
                'referer': 'https://en1.y2mate.is/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0',
            },
            body: `hash=${encodeURIComponent(url)}`,
        });

        const json = await taskResponse.json();

        if (json.error) {
            console.error('Error starting download task:', json.message);
            return reject(new Error(json.message));
        }

        let status = false;
        while (!status) {
            await sleep(1000);
            const statusResponse = await fetch('https://srvcdn8.2convert.me/api/json/task', {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'origin': 'https://en1.y2mate.is',
                    'referer': 'https://en1.y2mate.is/',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0',
                },
                body: `taskId=${json.taskId}`,
            });

            const statusJson = await statusResponse.json();

            if (statusJson.error) {
                console.error('Error checking task status:', statusJson.message);
                return reject(new Error(statusJson.message));
            }

            if (statusJson.status === 'finished') {
                status = true;
                resolve(statusJson);
                break;
            }

            if (statusJson.status === 'error') {
                return reject(new Error('Task encountered an error.'));
            }
        }
    } catch (error) {
        console.error('Error in getUrlDl:', error);
        reject(error);
    }
});

export {
    bestFormat,
    getUrlDl,
};

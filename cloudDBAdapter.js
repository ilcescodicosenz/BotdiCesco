import got from 'got';
import { Buffer } from 'buffer';
const stringify = (obj) => JSON.stringify(obj, null, 2);
const parse = (str) => JSON.parse(str, (_, v) => {
  if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
    return Buffer.from(v.data);
  }
  return v;
});
/**
 * CloudDBAdapter
 * @class
 */
class CloudDBAdapter {
  /**
   * Costruttore
   * @param {string} url - URL del database
   * @param {object} [options] - Opzioni
   * @param {function} [options.serialize] - Funzione di serializzazione
   * @param {function} [options.deserialize] - Funzione di deserializzazione
   * @param {object} [options.fetchOptions] - Opzioni per la richiesta HTTP
   */
  constructor(url, {
    serialize = stringify,
    deserialize = parse,
    fetchOptions = {},
  } = {}) {
    this.url = url;
    this.serialize = serialize;
    this.deserialize = deserialize;
    this.fetchOptions = fetchOptions;
  }

  /**
   * Legge il database
   * @async
   * @returns {Promise<object>} Oggetto deserializzato
   */
  async read() {
    try {
      const res = await got(this.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json;q=0.9,text/plain',
        },
        ...this.fetchOptions,
      });
      if (res.statusCode !== 200) throw res.statusMessage;
      return this.deserialize(res.body);
    } catch (e) {
      return null;
    }
  }
  /**
   * Scrive sul database
   * @async
   * @param {object} obj - Oggetto da serializzare
   * @returns {Promise<string>} Risposta del server
   */
  async write(obj) {
    const res = await got(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...this.fetchOptions,
      body: this.serialize(obj),
    });
    if (res.statusCode !== 200) throw res.statusMessage;
    return res.body;
  }
}

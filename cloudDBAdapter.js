import got from 'got';
import { Buffer } from 'buffer';

const stringify = (obj) => JSON.stringify(obj, null, 2);
const parse = (str) => JSON.parse(str, (_, v) => {
  if (v !== null && typeof v === 'object' && 'type' in v && v.type === 'Buffer' && 'data' in v && Array.isArray(v.data)) {
    return Buffer.from(v.data);
  }
  return v;
});

class CloudDBAdapter {
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

  async read() {
    try {
      const res = await got(this.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json;q=0.9,text/plain',
        },
        ...this.fetchOptions,
      });
      if (res.statusCode !== 200) throw new Error(res.statusMessage);
      return this.deserialize(res.body);
    } catch (e) {
      console.error('Errore di lettura:', e);
      return null;
    }
  }

  async write(obj) {
    try {
      const res = await got(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...this.fetchOptions,
        body: this.serialize(obj),
      });
      if (res.statusCode !== 200) throw new Error(res.statusMessage);
      return res.body;
    } catch (e) {
      console.error('Errore di scrittura:', e);
      return null;
    }
  }

  async update(id, updates) {
    try {
      const res = await got(`${this.url}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        ...this.fetchOptions,
        body: this.serialize(updates),
      });
      if (res.statusCode !== 200) throw new Error(res.statusMessage);
      return res.body;
    } catch (e) {
      console.error('Errore di aggiornamento:', e);
      return null;
    }
  }

  async delete(id) {
    try {
      const res = await got(`${this.url}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        ...this.fetchOptions,
      });
      if (res.statusCode !== 200) throw new Error(res.statusMessage);
      return res.body;
    } catch (e) {
      console.error('Errore di eliminazione:', e);
      return null;
    }
  }
}

const db = new CloudDBAdapter('https://example.com/db');
db.read().then(data => console.log(data));
db.write({ key: 'value' }).then(response => console.log(response));
db.update('123', { key: 'newValue' }).then(response => console.log(response));
db.delete('123').then(response => console.log(response));

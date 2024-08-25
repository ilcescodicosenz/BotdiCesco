import { join } from 'path';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { google } from 'googleapis';
import { EventEmitter } from 'events';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first time.
const TOKEN_PATH = join(__dirname, '..', 'token.json');

class GoogleAuth extends EventEmitter {
  constructor() {
    super();
    this.oAuth2Client = null;
  }

  async authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
      const token = JSON.parse(await fs.readFile(TOKEN_PATH));
      this.oAuth2Client.setCredentials(token);
    } catch (e) {
      const authUrl = this.oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      this.emit('auth', authUrl);
      const code = await promisify(this.once).bind(this)('token');
      const { tokens } = await this.oAuth2Client.getToken(code);
      this.oAuth2Client.setCredentials(tokens);
      await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens));
    }
  }

  token(code) {
    this.emit('token', code);
  }
}

class GoogleDrive extends GoogleAuth {
  constructor() {
    super();
    this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });
  }

  async getFolderID(path) {
    const res = await this.drive.files.list({
      q: `name='${path}' and mimeType='application/vnd.google-apps.folder'`,
      spaces: 'drive',
    });
    const folder = res.data.files[0];
    return folder ? folder.id : null;
  }

  async infoFile(fileId) {
    const res = await this.drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, parents',
    });
    return res.data;
  }

  async folderList(folderId) {
    const res = await this.drive.files.list({
      q: `'${folderId}' in parents`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType)',
    });
    return res.data.files;
  }

  async downloadFile(fileId, destPath) {
    const dest = fs.createWriteStream(destPath);
    const res = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    return new Promise((resolve, reject) => {
      res.data
        .on('end', () => {
          resolve(destPath);
        })
        .on('error', (err) => {
          reject(err);
        })
        .pipe(dest);
    });
  }

  async uploadFile(filePath, folderId = null) {
    const fileName = filePath.split('/').pop();
    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : [],
    };
    const media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream(filePath),
    };
    const res = await this.drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, name',
    });
    return res.data;
  }

  // Nuova funzione: Creazione di una nuova cartella
  async createFolder(folderName, parentFolderId = null) {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : [],
    };
    const res = await this.drive.files.create({
      resource: fileMetadata,
      fields: 'id, name',
    });
    return res.data;
  }

  // Nuova funzione: Condivisione di un file
  async shareFile(fileId, email) {
    const permissions = {
      type: 'user',
      role: 'reader',
      emailAddress: email,
    };
    await this.drive.permissions.create({
      resource: permissions,
      fileId,
      fields: 'id',
    });
  }

  // Nuova funzione: Ricerca file per nome
  async searchFile(fileName) {
    const res = await this.drive.files.list({
      q: `name contains '${fileName}'`,
      spaces: 'drive',
      fields: 'files(id, name, mimeType)',
    });
    return res.data.files;
  }
}

export {
  GoogleAuth,
  GoogleDrive,
};

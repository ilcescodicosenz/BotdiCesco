{
  "name": "BotdiCesco",
  "version": "2.3",
  "description": "Il mio bot personale per WhatsApp",
  "main": "index.js",
  "private": true,
  "directories": {
    "lib": "lib",
    "src": "src",
    "plugins": "plugins"
  },
  "scripts": {
    "start": "node index.js",
    "test": "node test.mjs", 
    "test2": "nodemon index.js",
    "eslint": "eslint .",
    "eslintfix": "eslint --fix .",
    "prod": "NODE_ENV=production node index.js"
  },
  "homepage": "https://github.com/MoonContent",
  "author": {
    "name": "Cesco"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/MoonContent"
  },
  "bugs": {
    "url": "https://github.com/MoonContent/issues"
  },
  "license": "GPL-3.0-or-later",
  "dependencies": {
    "@adiwajshing/keyed-db": "^0.2.5",
    "@bochilteam/scraper": "^4.2.5",
    "@whiskeysockets/baileys": "^6.7.3",
    "axios": "^1.1.4",
    "body-parser": "^1.20.3",
    "chalk": "^5.0.1",
    "express": "^4.17.4",
    "fluent-ffmpeg": "^2.1.3",
    "formdata-node": "^4.3.3",
    "google-it": "^1.6.4",
    "lodash": "^4.17.22",
    "lowdb": "^3.0.1",
    "moment-timezone": "^0.5.35",
    "mongoose": "^6.3.4",
    "node-fetch": "^2.6.1"
  },
  "keywords": [
    "bot",
    "whatsapp",
    "personal"
  ],
  "contributors": [
    "Cesco <cesco@example.com>"
  ],
  "engines": {
    "node": ">=14.17.0"
  },
  "os": [
    "windows",
    "linux",
    "darwin"
  ],
  "cpu": [
    "x64",
    "arm"
  ],
  "browser": {
    "chrome": ">=100.0.0",
    "firefox": ">=90.0.0"
  },
  "browserslist": [
    "chrome",
    "firefox",
    "safari",
    "edge"
  ],
  "type": "module"
}
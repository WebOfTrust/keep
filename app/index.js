'use strict';

const path = require('path');
const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');
const express = require("express");

log.transports.file.resolvePath = () => path.join(__dirname, 'keep.log');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: `./assets/icon.png`
    });

    win.webContents.openDevTools();
    win.loadFile(path.join(__dirname, 'index.html'));

    let KEEP_PORT = 5520;
    let API_PORT = 5621;
    let HOST = 'http://127.0.0.1';

    const configPath = path.join(__dirname, 'config.json');
    const debugPath = path.join(__dirname, 'debug.json');

    let config = {};
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
        API_PORT = config['API_PORT'];
        KEEP_PORT = config['KEEP_PORT'];
    }

    const serving = express();

    if (fs.existsSync(debugPath)) {
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools();
        }
    }

    serving.listen(KEEP_PORT, () => {
        console.log(`Serving UI on ${KEEP_PORT}`);
    });
    serving.use(express.static('static'));

    const endpoint = `${HOST}:${API_PORT}`
    retry((retry) => {
        log.info('⏳ connecting...', endpoint);
        return fetch(endpoint).catch(retry);
    }).then(() => {
        log.info('🚀 connected.')
        win.loadURL(`${HOST}:${KEEP_PORT}`).then(() =>
            log.info('🏰 loading Keep...'));
    }).catch(() => {
        app.quit();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

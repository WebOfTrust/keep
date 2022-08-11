'use strict';

const os = require("os");
const path = require('path');
const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const retry = require('promise-retry');
const axios = require('axios').default;
const log = require('electron-log');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: `./assets/icon.png`
    });

    const keep_home = path.join(os.homedir(), '.keep');
    if (!fs.existsSync(keep_home)) {
        log.info(`creating ${keep_home}`)
        fs.mkdirSync(keep_home);
    }

    log.transports.file.resolvePath = () => path.join(keep_home, 'keep.log');
    win.loadFile('./index.html');

    let API_PORT = 5621;
    let HOST = 'http://127.0.0.1';

    const configPath = path.join(__dirname, 'config.json');
    const debugPath = path.join(__dirname, 'debug.json');

    let config = {};
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
        API_PORT = config['API_PORT'];
    }

    if (fs.existsSync(debugPath)) {
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools();
        }
    }

    const endpoint = `${HOST}:${API_PORT}/codes`
    retry((retry) => {
        log.info('⏳ connecting...', endpoint);
        return axios.get(endpoint).catch(function (err) {
            log.error("err", err);
            retry(err);
        });
    }).then(() => {
        log.info('🚀 connected.')
        win.loadFile('./static/index.html').then(() =>
            log.info('🏰 loaded Keep on...'));
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

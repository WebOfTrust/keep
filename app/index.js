const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const {spawn} = require('child_process');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');
const path = require('path')
const express = require("express");
const cors = require('cors');

log.transports.file.resolvePath = () => `${__dirname}${path.sep}keep.log`

let ward = null;
let keep = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: `${__dirname}${path.sep}assets${path.sep}icon.icns`
    });

    // noinspection JSIgnoredPromiseFromCall

    win.loadFile(`${__dirname}${path.sep}index.html`);

    let config = {};
    const configPath = `${__dirname}${path.sep}ward${path.sep}config.json`;
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
    }

    let args = [];
    const API_HOST = 'http://localhost';
    args.push("--tcp", config["TCP_PORT"]);
    args.push("--admin", config["API_PORT"]);

    const debugPath = `${__dirname}${path.sep}ward${path.sep}debug.json`;
    if (fs.existsSync(debugPath)) {
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools()
            args.push("--debug")
        }
    }

    if (ward === null) {
        ward = spawn(`${__dirname}${path.sep}ward${path.sep}ward`, args);
        ward.on('error', function (err) {
            log.error('spawn error' + err);
        });

        ward.stdout.on('data', (data) => {
            let buffer = Buffer.from(data);
            log.info('out:', buffer.toString());
        });

        ward.stderr.on('data', (data) => {
            let buffer = Buffer.from(data);
            let err = buffer.toString()
            if (err.match(/Address already in use/) ||
                err.match(/keri.kering.AuthError/ ||
                    err.match(/keri.kering.ConfigurationError/))
            ) {
                // noinspection JSIgnoredPromiseFromCall
                win.loadFile(`${__dirname}${path.sep}oops.html`);
                ward.kill();
            }
            log.error('err:', err);
        });

        ward.on('close', (code) => {
            log.info(`ward process exited with code ${code}`);
        });
    }

    let corsOptions = {
        origin: `http://localhost:${config["API_PORT"]}`,
        optionsSuccessStatus: 200
    }

    keep = express().use("/keep", cors(corsOptions), function (_, res) {
        res.json(fs.existsSync(`${__dirname}${path.sep}ward${path.sep}keri${path.sep}ks${path.sep}keep-${config["USER_TYPE"]}-${config["API_PORT"]}`));
    }).listen(~~config["KEEP_PORT"]);

    const host = `${API_HOST}:${config["API_PORT"]}`
    retry((retry) => {
        log.info('⏳ launching...');
        return fetch(host).catch(retry);
    }).then(() => {
        win.loadURL(host).then(() =>
            log.info('🚀 launched...'))
    }).catch(() => {
        ward.kill();
        app.quit();
        keep.close();
    });
}

app.whenReady().then(() => {
    createWindow()

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

app.on('will-quit', () => {
    ward.kill();
    keep.close();
});
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
const todesktop = require("@todesktop/runtime");

log.transports.file.resolvePath = () => `${__dirname}${path.sep}keep.log`

todesktop.init({
    customLogger: log,
});


let ward = null;
let keep = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: `${__dirname}${path.sep}assets${path.sep}icon.icns`
    });
    win.webContents.openDevTools();
    // noinspection JSIgnoredPromiseFromCall
    log.info("create");
    win.loadFile(`${__dirname}${path.sep}index.html`);
    log.info("1");
    let config = {};
    const configPath = `${__dirname}${path.sep}ward${path.sep}config.json`;
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
    }
    log.info("2");
    let args = [];
    const API_HOST = 'http://127.0.0.1';
    args.push("--tcp", config["TCP_PORT"]);
    args.push("--admin", config["API_PORT"]);
    log.info("3");
    const debugPath = `${__dirname}${path.sep}ward${path.sep}debug.json`;
    log.info("4");
    if (fs.existsSync(debugPath)) {
        log.info("5");
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools()
            args.push("--debug")
        }
    }

    log.info("warding", ward, args);

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
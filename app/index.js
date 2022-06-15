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
        icon: `./assets/icon.icns`
    });
    win.webContents.openDevTools();
    console.log("dir", __dirname)
    // noinspection JSIgnoredPromiseFromCall
    log.info("create", __dirname);
    win.loadFile(`./index.html`);
    log.info("1");
    let config = {};
    const configPath = `./ward/config.json`;
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
    }
    log.info("2");
    let args = [];
    const API_HOST = 'http://127.0.0.1';
    args.push("--tcp", "5721");
    args.push("--admin", "5621");
    log.info("3");
    const debugPath = `./ward/debug.json`;
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
        ward = spawn(`./ward/ward`, args);
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
        origin: "http://localhost:5621",
        optionsSuccessStatus: 200
    }

    keep = express().use("/keep", cors(corsOptions), function (_, res) {
        res.json(fs.existsSync(`./ward/keri/ks/keep-root-gar-5621`));
    }).listen(6621);

    const host = "http://127.0.0.1:5621"
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
const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const {execFile} = require('child_process');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');
const path = require('path')
const express = require("express");
const cors = require('cors');

log.transports.file.resolvePath = () => `${__dirname}${path.sep}keep.log`

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
    try {
        config = require("./ward/config.json");
    } catch (err) {
        console.log("config err", err);
        process.exit();
    }

    log.info(config);
    log.info("2");

    let args = [];
    const API_HOST = 'http://127.0.0.1';
    args.push("--tcp", "5721");
    args.push("--admin", "5621");
    log.info("3");

    let debug = false;
    try {
        debug = require("./ward/debug.json");
    } catch (err) {
        console.log("no debug");
    }

    if (debug === true) {
        win.webContents.openDevTools()
        args.push("--debug")
    }

    log.info("warding", ward, args);

    if (ward === null) {
        ward = execFile(path.join(__dirname, "ward", "ward"), args);
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
                win.loadFile(`./oops.html`);
                ward.kill();
            }
            log.error('err:', err);
        });

        ward.on('close', (code) => {
            log.info(`ward process exited with code ${code}`);
        });
    }

    keep = express().use("/keep", cors(), function (_, res) {
        log.info(fs.existsSync(path.join("ward", "keri", "ks", `keep-${config["USER_TYPE"]}-${config["API_PORT"]}`)));
        res.json(fs.existsSync(path.join("ward", "keri", "ks", `keep-${config["USER_TYPE"]}-${config["API_PORT"]}`)));
    }).listen(~~config["KEEP_PORT"]);

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
'use strict';

require('hazardous');
const path = require('path');
const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const {execFile} = require('child_process');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');
const express = require("express");
const cors = require('cors');

log.transports.file.resolvePath = () => path.join(__dirname, 'keep.log');

let keep = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1440,
        height: 1024,
        icon: `./assets/icon.png`
    });

    win.webContents.openDevTools();

    win.loadFile(path.join(__dirname, 'index.html'));

    let config = {};

    let ADMIN_PORT = 5621
    const API_HOST = 'http://127.0.0.1';
    const configPath = path.join(__dirname, 'ward/config.json');
    if (fs.existsSync(configPath)) {
        config = JSON.parse(fs.readFileSync(configPath));
        ADMIN_PORT = config['ADMIN_PORT']
    }


    if (fs.existsSync(debugPath)) {
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools()
        }
    }

    const host = `${API_HOST}:${ADMIN_PORT}`
    retry((retry) => {
        log.info('⏳ connecting...');
        return fetch(host).catch(retry);
    }).then(() => {
        win.loadURL(host).then(() =>
            log.info('🚀 connecting...'))
    }).catch(() => {
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
    keep.close();
});
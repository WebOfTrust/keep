const electron = require('electron');
const {app, BrowserWindow} = electron;
const fs = require('fs');
const {spawn} = require('child_process');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');
const path = require('path')

log.transports.file.resolvePath = () => `${__dirname}${path.sep}keep.log`

let ward = null;

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
    process.env.API_HOST = 'http://localhost';

    process.env.TCP_PORT = config["TCP_PORT"];
    args.push("--tcp", process.env.TCP_PORT)

    process.env.API_PORT = config["API_PORT"];
    args.push("--admin", process.env.API_PORT)

    process.env.USER_TYPE = config["USER_TYPE"];

    const debugPath = `${__dirname}${path.sep}ward${path.sep}debug.json`;
    if (fs.existsSync(debugPath)) {
        let debug = JSON.parse(fs.readFileSync(debugPath));
        if (debug === true) {
            win.webContents.openDevTools()
            args.push("--debug")

            log.info(args)
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
    const host = `${process.env.API_HOST}:${process.env.API_PORT}`
    retry((retry) => {
        log.info('⏳ launching...');
        return fetch(host).catch(retry);
    }).then(() => {
        win.loadURL(host).then(() =>
            log.info('🚀 launched...'))
    }).catch(() => {
        ward.kill();
        app.quit()
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
});
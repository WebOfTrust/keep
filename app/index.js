const electron = require('electron');
const {app, BrowserWindow} = electron;

const {spawn} = require('child_process');
const retry = require('promise-retry');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const log = require('electron-log');

let ward = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: `${__dirname}/assets/icon.icns`
    });

    // noinspection JSIgnoredPromiseFromCall
    win.loadFile(__dirname + '/index.html');

    win.webContents.openDevTools()

    if (ward === null) {
        ward = spawn(`${__dirname}/ward/ward`);
        ward.on('error', function(err) {
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
                err.match(/keri.kering.ConfigurationError/) )
            ) {
                // noinspection JSIgnoredPromiseFromCall
                win.loadFile(__dirname + '/oops.html');
                ward.kill();
            }
            log.error('err:', err);
        });

        ward.on('close', (code) => {
            log.info(`ward process exited with code ${code}`);
        });
    }

    retry((retry) => {
        log.info('⏳ launching...');
        return fetch('http://localhost:5623').catch(retry);
    }).then(() => {
        win.loadURL('http://localhost:5623').then(() =>
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
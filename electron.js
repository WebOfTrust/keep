const { spawn } = require('child_process');
const path = require('path');
const { app, BrowserWindow } = require('electron');

let ward = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 1024,
  });

  setTimeout(() => {
    win.loadURL('http://localhost:5678');
  }, 500);
  spawnChildProcess();
}

function spawnChildProcess() {
  ward = spawn('./ward/dist/ward/ward');
  ward.stdout.on('data', (data) => {
    let buffer = Buffer.from(data);
    console.log('out:', buffer.toString());
  });
  ward.stderr.on('data', (data) => {
    let buffer = Buffer.from(data);
    console.log('err:', buffer.toString());
  });
  ward.on('close', (code) => {
    console.log(`ward process exited with code ${code}`);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  ward.kill();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

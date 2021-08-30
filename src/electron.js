const { spawn } = require('child_process');
const path = require('path');
const { app, BrowserWindow } = require('electron');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('src/app/index.html');
  spawnChildProcess();
}

function spawnChildProcess() {
  // let executablePath = path.join(app.getPath('exe'), '../', 'ward.exe');
  // let ward = spawn(`${executablePath}`);
  let ward = spawn('ls', ['-lh', '/']);
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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

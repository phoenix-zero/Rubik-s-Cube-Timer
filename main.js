import { app, BrowserWindow, Menu, ipcMain } from 'electron';
// import fs from 'fs';

let mainWindow;
const isMac = false;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'File',
        submenu: [
          {
            label: 'Save',
            accelerator: 'Ctrl+S',
            click() {
              mainWindow.send('SAVE_REQUESTED', {});
            },
          },
          isMac ? { role: 'close' } : { role: 'quit' },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
    ]),
  );

  mainWindow.loadFile('components/main.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  ipcMain.on('SAVE_DATA', (event, data) => {
    console.log(data.msg);
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

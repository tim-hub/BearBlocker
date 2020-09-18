const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
require('dotenv').config();
if (!process.env.PRODUCTION) {
  require('electron-reload')(
      __dirname,
  );
}

const {menu} = require('./menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true, // this is for an issue related to electron-store, app undefined, https://github.com/sindresorhus/electron-store/issues/138
    },
    resizable: false,
  });

  // and load the index2.html of the app.
  win.loadFile(path.join(__dirname, '../pages/index2.html'));

  // Open the DevTools.
  if (process.env.LOG_LEVEL && process.env.LOG_LEVEL === 'debug') {
    win.webContents.openDevTools();
  }


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would localStore windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

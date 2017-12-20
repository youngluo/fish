const contextMenu = require('./menu');
const electron = require('electron');
const IpcMain = require('./ipcMain');
const path = require('path');
const url = require('url');

const { BrowserWindow, app, Menu } = electron;

require('electron-reload')(path.join(__dirname, 'electron'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 694,
    minWidth: 1200,
    minHeight: 694,
    frame: false,
    show: false
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(
      url.format({
        pathname: 'localhost:4200',
        protocol: 'http:'
      })
    );

    contextMenu(mainWindow, Menu);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // mainWindow.webContents.once('dom-ready', () => {
  //   console.log('dom-ready')
  //   mainWindow.webContents.reload();
  // });

  new IpcMain(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const electron = require('electron');
const { ipcMain, dialog } = electron;

module.exports = class IpcMain {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.init();
  }

  init() {
    // 关闭窗口
    ipcMain.on('closeWindow', () => {
      this.mainWindow.close();
    });

    // 最小化窗口
    ipcMain.on('minimizeWindow', () => {
      this.mainWindow.minimize();
    });

    // 最大化窗口
    ipcMain.on('fullScreenWindow', () => {
      if (this.mainWindow.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow.maximize();
      }
    });

    ipcMain.on('readTemplate', () => {
      dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
      }, function (files) {
        console.log(files)
      })
    });
  }
}

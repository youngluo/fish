const { ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

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

    ipcMain.on('readTemplate', (event) => {
      dialog.showOpenDialog({
        properties: ['openDirectory', 'openFile']
      }, files => this.readFileList(event, files));
    });
  }

  readFileList(event, files) {
    if (!files) return;

    const url = files[0];
    let results = [];

    fs.readdir(url, (err, files) => {
      if (err) return;

      files.forEach(filename => {
        const readPath = path.join(url, filename);

        fs.statSync(readPath, (err, stats) => {
          if (err) return;

          console.log(stats);
          if (stats.isFile()) {
            results.push({
              name: filename
            });
          }
        });
      });

      event.sender.send('getTemplate', results);
    });
  }
}

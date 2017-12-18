module.exports = function(mainWindow, Menu) {
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;

    Menu.buildFromTemplate([
      {
        label: '审查元素',
        click: () => {
          mainWindow.inspectElement(x, y);
        }
      },
      {
        label: '刷新',
        click: () => {
          mainWindow.webContents.reload();
        }
      }
    ]).popup(mainWindow);
  });
};

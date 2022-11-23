app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  globalShortcut.register('Command+Control+Z', () => {
    app.show();
    for (const win of BrowserWindow.getAllWindows()) win.show();
  });

  app.dock?.setMenu(Menu.buildFromTemplate([{ label: 'New Window', click: createWindow }]));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});



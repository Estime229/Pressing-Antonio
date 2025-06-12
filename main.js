const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('login.html'); // Affiche la page de login au démarrage

  // Navigation classique
  ipcMain.on('navigate', (event, page) => {
    win.loadFile(`${page}.html`);
  });

  // Si login OK, charge le dashboard
  ipcMain.on('login-success', () => {
    win.loadFile('dashboard.html');
  });
}

app.whenReady().then(createWindow);
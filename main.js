const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { checkUser } = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadFile('login.html');
}

app.whenReady().then(createWindow);

// Réception de la demande de login
ipcMain.handle('login-attempt', async (event, username, password) => {
  return new Promise((resolve) => {
    checkUser(username, password, (err, result) => {
      if (err) resolve({ success: false, error: 'Erreur interne' });
      else if (result.valid) resolve({ success: true, role: result.role });
      else resolve({ success: false, error: 'Identifiants incorrects' });
    });
  });
});

// Gestion de la navigation entre les pages
ipcMain.on('navigate', (event, page) => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;
  switch (page) {
    case 'dashboard':
      win.loadFile('dashboard.html');
      break;
    case 'tresorerie':
      win.loadFile('tresorerie.html');
      break;
    case 'clients':
      win.loadFile('clients.html');
      break;
    case 'commandes':
      win.loadFile('commandes.html');
      break;
    case 'articles':
      win.loadFile('articles.html');
      break;
    case 'parametres':
      win.loadFile('parametres.html');
      break;
    default:
      win.loadFile('dashboard.html');
  }
});

const { getAllUsers, addUser, deleteUser, updateUserRole, changePassword } = require('./database');
// Liste des utilisateurs
ipcMain.handle('get-users', async () => {
  return await getAllUsers();
});

// Ajouter un utilisateur
ipcMain.handle('add-user', async (event, username, password, role) => {
  return await addUser(username, password, role);
});

// Supprimer un utilisateur
ipcMain.handle('delete-user', async (event, username) => {
  return await deleteUser(username);
});

// Modifier le rôle d'un utilisateur
ipcMain.handle('update-user', async (event, username, role) => {
  return await updateUserRole(username, role);
});

// Changer le mot de passe de l'utilisateur connecté
ipcMain.handle('change-password', async (event, newPassword) => {
  // Récupère le nom d'utilisateur depuis la session ou le contexte (à adapter selon ton app)
  const username = global.currentUser;
  if (!username) return { success: false, error: "Utilisateur non connecté" };
  return await changePassword(username, newPassword);
});
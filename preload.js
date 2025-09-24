const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  login: (username, password) =>
    ipcRenderer.invoke('login-attempt', username, password),
  navigate: (page) => ipcRenderer.send('navigate', page),
    getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (username, password, role) => ipcRenderer.invoke('add-user', username, password, role),
  deleteUser: (username) => ipcRenderer.invoke('delete-user', username),
  updateUser: (username, role) => ipcRenderer.invoke('update-user', username, role),
    changePassword: (password) => ipcRenderer.invoke('change-password', password),

});
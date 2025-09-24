const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pressing.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'employe'
)`);

// Fonction pour vérifier les identifiants
function checkUser(username, password, callback) {
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) return callback(err);
      if (row) callback(null, { valid: true, role: row.role });
      else callback(null, { valid: false });
    }
  );
}

// Fonction pour ajouter un utilisateur (à utiliser une seule fois pour créer un admin)
function addUser(username, password, role, callback) {
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, role],
    function (err) {
      callback(err);
    }
  );
}

// Récupérer tous les utilisateurs
function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT username, role FROM users', [], (err, rows) => {
      if (err) resolve([]);
      else resolve(rows);
    });
  });
}

// Ajouter un utilisateur
function addUser(username, password, role) {
  return new Promise((resolve) => {
    db.run(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role],
      function (err) {
        if (err) resolve({ success: false, error: "Nom d'utilisateur déjà utilisé" });
        else resolve({ success: true });
      }
    );
  });
}

// Supprimer un utilisateur
function deleteUser(username) {
  return new Promise((resolve) => {
    db.run('DELETE FROM users WHERE username = ?', [username], function (err) {
      if (err) resolve({ success: false, error: "Erreur lors de la suppression" });
      else resolve({ success: true });
    });
  });
}

// Modifier le rôle d'un utilisateur
function updateUserRole(username, role) {
  return new Promise((resolve) => {
    db.run('UPDATE users SET role = ? WHERE username = ?', [role, username], function (err) {
      if (err) resolve({ success: false, error: "Erreur lors de la modification" });
      else resolve({ success: true });
    });
  });
}

// Changer le mot de passe d'un utilisateur
function changePassword(username, newPassword) {
  return new Promise((resolve) => {
    db.run(
      'UPDATE users SET password = ? WHERE username = ?',
      [newPassword, username],
      function (err) {
        if (err) resolve({ success: false, error: "Erreur lors de la modification du mot de passe" });
        else if (this.changes === 0) resolve({ success: false, error: "Utilisateur non trouvé" });
        else resolve({ success: true });
      }
    );
  });
}

module.exports = { checkUser, addUser,   getAllUsers,
  addUser, 
  deleteUser,
  updateUserRole,
  changePassword
 };
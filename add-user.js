const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pressing.db');

// Création de la table puis ajout des utilisateurs
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'employe'
)`, () => {
  // Ajoute l'admin
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    ['admin', 'admin123', 'admin'],
    function (err) {
      if (err) {
        console.error('Erreur lors de l’ajout de l’admin :', err.message);
      } else {
        console.log('Admin ajouté avec succès !');
      }
    }
  );
  // Ajoute l'employé
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    ['employe1', 'employe123', 'employe'],
    function (err) {
      if (err) {
        console.error('Erreur lors de l’ajout de l’employé :', err.message);
      } else {
        console.log('Employé ajouté avec succès !');
      }
      db.close();
    }
  );
});
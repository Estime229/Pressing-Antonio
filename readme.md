# PressingApp

Application de gestion de pressing (clients, commandes, articles, trésorerie) développée avec [Electron](https://www.electronjs.org/).

## Fonctionnalités

- Authentification (login)
- Gestion des clients
- Gestion des commandes (avec tickets de caisse imprimables)
- Gestion des articles (prix, délai, etc.)
- Suivi de la trésorerie (recettes, dépenses, solde)
- Paramètres du pressing
- Base de données embarquée (SQLite, aucun serveur externe requis)
- Export CSV

## Installation

1. **Cloner le projet**

```bash
git clone <url-du-repo>
cd pressing-app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l’application en mode développement**

```bash
npm start
```

## Générer un exécutable

- **Windows ou Mac** (selon ta plateforme) :

```bash
npm run dist
```

Les exécutables seront générés dans le dossier `dist/`.

## Structure du projet

```
pressing-app/
├── main.js           # Processus principal Electron
├── package.json
├── login.html
├── dashboard.html
├── commandes.html
├── articles.html
├── parametres.html
├── tresorerie.html
├── ticket.html
├── ...
```

## Base de données

- Utilise **SQLite** (via [better-sqlite3](https://www.npmjs.com/package/better-sqlite3))
- Les données sont stockées localement dans `pressing.db`


## Personnalisation

- Modifie les informations du pressing dans la page **Paramètres**
- Adapte les modèles de tickets, articles, etc. selon tes besoins

## Licence

Projet privé ou à compléter selon ton usage.
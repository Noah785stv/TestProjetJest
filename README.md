# Gestion d'Utilisateurs

Une application simple de gestion d'utilisateurs développée avec Node.js et Express.

## Fonctionnalités

- Affichage de la liste des utilisateurs
- Ajout d'un nouvel utilisateur
- Modification d'un utilisateur existant
- Suppression d'un utilisateur

## Structure du Projet

- `models/` : Définition des modèles de données
- `services/` : Services contenant la logique métier
- `controllers/` : Contrôleurs pour gérer les requêtes
- `routes/` : Définition des routes de l'API
- `public/` : Fichiers statiques (HTML, CSS, JS client)
- `tests/` : Tests unitaires et d'intégration

## Installation

```bash
# Cloner le dépôt
git clone <URL_DU_REPO>
cd gestion-utilisateurs

# Installer les dépendances
npm install
```

## Démarrage

```bash
# Lancer l'application
npm start
```

L'application sera accessible à l'adresse : http://localhost:3000

## Tests

```bash
# Exécuter les tests
npm test
```

## API REST

- `GET /users` : Récupérer tous les utilisateurs
- `GET /users/:id` : Récupérer un utilisateur par ID
- `POST /users` : Ajouter un nouvel utilisateur
- `PUT /users/:id` : Mettre à jour un utilisateur
- `DELETE /users/:id` : Supprimer un utilisateur 
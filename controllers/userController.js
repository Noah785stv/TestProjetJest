const userService = require('../services/userService');

// Fonctions du contrôleur
const userController = {
  // Lister tous les utilisateurs
  getAllUsers: (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
  },

  // Obtenir un utilisateur par id
  getUserById: (req, res) => {
    const id = req.params.id;
    const user = userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  },

  // Ajouter un utilisateur
  addUser: (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'name et email sont requis' });
    }
    const user = userService.addUser({ name, email });
    res.status(201).json(user);
  },

  // Mettre à jour un utilisateur
  updateUser: (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'name et email sont requis' });
    }
    
    const updatedUser = userService.updateUser(id, { name, email });
    
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  },

  // Supprimer un utilisateur
  deleteUser: (req, res) => {
    const id = req.params.id;
    const deleted = userService.deleteUser(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  }
};

module.exports = userController; 
const userService = require('../services/userService');

// Réinitialiser l'état du service avant chaque test
beforeEach(() => {
  // Nous devons accéder à l'état interne pour le réinitialiser
  // Dans une vraie application, vous pourriez avoir une méthode reset() pour les tests
  userService._resetForTest && userService._resetForTest();
});

describe('User Service', () => {
  describe('getAllUsers', () => {
    test('devrait retourner un tableau vide au départ', () => {
      const users = userService.getAllUsers();
      expect(users).toEqual([]);
    });
  });

  describe('addUser', () => {
    test('devrait ajouter un utilisateur et lui attribuer un ID', () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      const user = userService.addUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      
      // Vérifier que l'utilisateur a été ajouté à la liste
      const users = userService.getAllUsers();
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(user);
    });
  });

  describe('getUserById', () => {
    test('devrait retourner null pour un ID inexistant', () => {
      const user = userService.getUserById(999);
      expect(user).toBeNull();
    });
    
    test('devrait retourner l\'utilisateur pour un ID existant', () => {
      // Ajouter un utilisateur pour le test
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const addedUser = userService.addUser(userData);
      
      // Récupérer l'utilisateur par ID
      const user = userService.getUserById(addedUser.id);
      
      expect(user).not.toBeNull();
      expect(user).toEqual(addedUser);
    });
  });

  describe('updateUser', () => {
    test('devrait retourner null pour un ID inexistant', () => {
      const result = userService.updateUser(999, { name: 'New Name', email: 'new@example.com' });
      expect(result).toBeNull();
    });
    
    test('devrait mettre à jour l\'utilisateur pour un ID existant', () => {
      // Ajouter un utilisateur pour le test
      const userData = { name: 'Bob Smith', email: 'bob@example.com' };
      const addedUser = userService.addUser(userData);
      
      // Mettre à jour l'utilisateur
      const updateData = { name: 'Bobby Smith', email: 'bobby@example.com' };
      const updatedUser = userService.updateUser(addedUser.id, updateData);
      
      expect(updatedUser).not.toBeNull();
      expect(updatedUser.id).toBe(addedUser.id);
      expect(updatedUser.name).toBe(updateData.name);
      expect(updatedUser.email).toBe(updateData.email);
      
      // Vérifier que l'utilisateur a été mis à jour dans la liste
      const user = userService.getUserById(addedUser.id);
      expect(user).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    test('devrait retourner false pour un ID inexistant', () => {
      const result = userService.deleteUser(999);
      expect(result).toBe(false);
    });
    
    test('devrait supprimer l\'utilisateur pour un ID existant', () => {
      // Ajouter un utilisateur pour le test
      const userData = { name: 'Alice Johnson', email: 'alice@example.com' };
      const addedUser = userService.addUser(userData);
      
      // Vérifier que l'utilisateur existe
      expect(userService.getUserById(addedUser.id)).not.toBeNull();
      
      // Supprimer l'utilisateur
      const result = userService.deleteUser(addedUser.id);
      
      expect(result).toBe(true);
      
      // Vérifier que l'utilisateur a été supprimé
      expect(userService.getUserById(addedUser.id)).toBeNull();
    });
  });
}); 
const userController = require('../controllers/userController');
const userService = require('../services/userService');

// Mock des fonctions du service
jest.mock('../services/userService');

describe('User Controller', () => {
  // Réinitialiser les mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    test('devrait retourner tous les utilisateurs', () => {
      // Simuler la liste d'utilisateurs retournée par le service
      const mockUsers = [
        { id: 1, name: 'User 1', email: 'user1@example.com' },
        { id: 2, name: 'User 2', email: 'user2@example.com' }
      ];
      
      // Mock de la fonction du service
      userService.getAllUsers.mockReturnValue(mockUsers);
      
      // Mock de l'objet req/res
      const req = {};
      const res = {
        json: jest.fn()
      };
      
      // Appeler le contrôleur
      userController.getAllUsers(req, res);
      
      // Vérifier que le service a été appelé
      expect(userService.getAllUsers).toHaveBeenCalled();
      
      // Vérifier que la réponse contient les utilisateurs
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('getUserById', () => {
    test('devrait retourner un utilisateur quand il existe', () => {
      // Simuler l'utilisateur retourné par le service
      const mockUser = { id: 1, name: 'User 1', email: 'user1@example.com' };
      
      // Mock de la fonction du service
      userService.getUserById.mockReturnValue(mockUser);
      
      // Mock de l'objet req/res
      const req = {
        params: { id: '1' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      // Appeler le contrôleur
      userController.getUserById(req, res);
      
      // Vérifier que le service a été appelé avec le bon ID
      expect(userService.getUserById).toHaveBeenCalledWith('1');
      
      // Vérifier que la réponse contient l'utilisateur
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
    
    test('devrait retourner 404 quand l\'utilisateur n\'existe pas', () => {
      // Mock de la fonction du service pour retourner null
      userService.getUserById.mockReturnValue(null);
      
      // Mock de l'objet req/res
      const req = {
        params: { id: '999' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      // Appeler le contrôleur
      userController.getUserById(req, res);
      
      // Vérifier que le service a été appelé avec le bon ID
      expect(userService.getUserById).toHaveBeenCalledWith('999');
      
      // Vérifier que le statut 404 a été retourné
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé' });
    });
  });

  describe('addUser', () => {
    test('devrait ajouter un utilisateur avec des données valides', () => {
      // Simuler l'utilisateur créé par le service
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      
      // Mock de la fonction du service
      userService.addUser.mockReturnValue(mockUser);
      
      // Mock de l'objet req/res
      const req = {
        body: { name: 'John Doe', email: 'john@example.com' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      // Appeler le contrôleur
      userController.addUser(req, res);
      
      // Vérifier que le service a été appelé avec les bonnes données
      expect(userService.addUser).toHaveBeenCalledWith(req.body);
      
      // Vérifier que le statut 201 a été retourné avec l'utilisateur
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
    
    test('devrait retourner 400 avec des données invalides', () => {
      // Mock de l'objet req/res
      const req = {
        body: { /* Données manquantes */ }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      
      // Appeler le contrôleur
      userController.addUser(req, res);
      
      // Vérifier que le service n'a pas été appelé
      expect(userService.addUser).not.toHaveBeenCalled();
      
      // Vérifier que le statut 400 a été retourné
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'name et email sont requis' });
    });
  });

  // Tests similaires pour updateUser et deleteUser
}); 
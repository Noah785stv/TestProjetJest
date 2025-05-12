const request = require('supertest');
const app = require('../app');
const userService = require('../services/userService');

describe('API Users', () => {
  // Réinitialiser l'état du service avant chaque test
  beforeEach(() => {
    userService._resetForTest();
  });

  describe('GET /users', () => {
    it('devrait retourner un tableau vide au départ', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    
    it('devrait retourner tous les utilisateurs après en avoir ajouté', async () => {
      // Ajouter des utilisateurs pour le test
      await request(app).post('/users').send({ name: 'User 1', email: 'user1@example.com' });
      await request(app).post('/users').send({ name: 'User 2', email: 'user2@example.com' });
      
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('User 1');
      expect(response.body[1].name).toBe('User 2');
    });
  });

  describe('GET /users/:id', () => {
    it('devrait retourner 404 pour un ID inexistant', async () => {
      const response = await request(app).get('/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
    
    it('devrait retourner l\'utilisateur pour un ID existant', async () => {
      // Ajouter un utilisateur pour le test
      const addResponse = await request(app)
        .post('/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      
      const userId = addResponse.body.id;
      
      const response = await request(app).get(`/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name', 'Test User');
      expect(response.body).toHaveProperty('email', 'test@example.com');
    });
  });

  describe('POST /users', () => {
    it('devrait retourner 400 avec des données invalides', async () => {
      // Requête sans name
      let response = await request(app).post('/users').send({ email: 'test@example.com' });
      expect(response.status).toBe(400);
      
      // Requête sans email
      response = await request(app).post('/users').send({ name: 'Test User' });
      expect(response.status).toBe(400);
      
      // Requête vide
      response = await request(app).post('/users').send({});
      expect(response.status).toBe(400);
    });
    
    it('devrait créer un utilisateur avec des données valides', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      
      const response = await request(app).post('/users').send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', userData.name);
      expect(response.body).toHaveProperty('email', userData.email);
    });
  });

  describe('PUT /users/:id', () => {
    it('devrait retourner 404 pour un ID inexistant', async () => {
      const response = await request(app)
        .put('/users/999')
        .send({ name: 'Updated User', email: 'updated@example.com' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
    
    it('devrait retourner 400 avec des données invalides', async () => {
      // Ajouter un utilisateur pour le test
      const addResponse = await request(app)
        .post('/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      
      const userId = addResponse.body.id;
      
      // Requête sans name
      let response = await request(app)
        .put(`/users/${userId}`)
        .send({ email: 'updated@example.com' });
      
      expect(response.status).toBe(400);
      
      // Requête sans email
      response = await request(app)
        .put(`/users/${userId}`)
        .send({ name: 'Updated User' });
      
      expect(response.status).toBe(400);
    });
    
    it('devrait mettre à jour l\'utilisateur avec des données valides', async () => {
      // Ajouter un utilisateur pour le test
      const addResponse = await request(app)
        .post('/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      
      const userId = addResponse.body.id;
      
      const updateData = { name: 'Updated User', email: 'updated@example.com' };
      
      const response = await request(app)
        .put(`/users/${userId}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', userId);
      expect(response.body).toHaveProperty('name', updateData.name);
      expect(response.body).toHaveProperty('email', updateData.email);
    });
  });

  describe('DELETE /users/:id', () => {
    it('devrait retourner 404 pour un ID inexistant', async () => {
      const response = await request(app).delete('/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
    
    it('devrait supprimer l\'utilisateur et retourner 204', async () => {
      // Ajouter un utilisateur pour le test
      const addResponse = await request(app)
        .post('/users')
        .send({ name: 'Test User', email: 'test@example.com' });
      
      const userId = addResponse.body.id;
      
      // Vérifier que l'utilisateur existe
      let response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(200);
      
      // Supprimer l'utilisateur
      response = await request(app).delete(`/users/${userId}`);
      expect(response.status).toBe(204);
      
      // Vérifier que l'utilisateur n'existe plus
      response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(404);
    });
  });
}); 
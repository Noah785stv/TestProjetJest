const User = require('../models/user');

let users = [];
let nextId = 1;

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find(user => user.id === parseInt(id)) || null;
}

function addUser(userData) {
  const user = new User(nextId++, userData.name, userData.email);
  users.push(user);
  return user;
}

function updateUser(id, userData) {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) return null;
  
  // Mettre à jour les propriétés de l'utilisateur
  users[userIndex].name = userData.name;
  users[userIndex].email = userData.email;
  
  return users[userIndex];
}

function deleteUser(id) {
  const initialLength = users.length;
  users = users.filter(user => user.id !== parseInt(id));
  return users.length < initialLength; // true si un user a été supprimé
}

// Méthode pour réinitialiser l'état pour les tests
function _resetForTest() {
  users = [];
  nextId = 1;
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  _resetForTest
};

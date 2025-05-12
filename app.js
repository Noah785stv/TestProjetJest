const express = require('express');
const routes = require('./routes/route');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Utilisation des routes centralisées
app.use('/', routes);

module.exports = app;

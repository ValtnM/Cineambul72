// Importation d'express et création de l'application
const express = require('express');
const app = express();


// Importation des modules
const mysql = require('mysql')
const path = require('path');
const helmet = require("helmet");


// Application d'helmet
app.use(helmet());


// Importation des routes
const adminRoutes = require('./routes/admin.js')
const communeRoutes = require('./routes/commune.js');
const photoRoutes = require('./routes/photo.js');
const filmRoutes = require('./routes/film.js');
const seanceRoutes = require('./routes/seance.js');
const datesSemaineRoutes = require('./routes/dates_semaine');
const mailRoutes = require('./routes/mail');
const messageRoutes = require('./routes/message.js')


// Middlewares permettant l'analyse du corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Autorise l'accès à l'API et l'envoie de requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});



// Ajoût des routes
app.use('/api/admin', adminRoutes);
app.use('/api/commune', communeRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/seance', seanceRoutes);
app.use('/api/dates_semaine', datesSemaineRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/message', messageRoutes);

// app.get('/', (req, res, next) => {
//     res.status(200).json({ messsage: "Test réussi ! "})
// })


// Gestion des requêtes vers la route '/images'
app.use('/images', express.static(path.join(__dirname, 'images')));


// Ecoute et lie l'application au port 3000
app.listen(8080);



// module.exports = app;
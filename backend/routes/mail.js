// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
// const auth = require('../middleware/auth');


// Importation des controllers
const mailCtrl = require('../controllers/mail.js');


// Déclaration des routes Like
router.post('/', mailCtrl.sendMail);



// Exportation du router
module.exports = router;
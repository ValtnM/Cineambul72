// Création du router
const express = require('express');
const router = express.Router();

// Importation des controllers
const messageCtrl = require('../controllers/message.js');


// Déclaration des routes Like
router.get('/:pageName', messageCtrl.getMessage);
router.post('/', messageCtrl.createMessage);



// Exportation du router
module.exports = router;
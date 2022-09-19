// Création du router
const express = require('express');
const router = express.Router();

// Importation des middleware
const auth = require('../middleware/auth');

// Importation des controllers
const messageCtrl = require('../controllers/message.js');


// Déclaration des routes Message
router.get('/:pageName', messageCtrl.getMessage);
router.post('/', auth, messageCtrl.createMessage);
router.delete('/:messageId', auth, messageCtrl.deleteMessage);



// Exportation du router
module.exports = router;
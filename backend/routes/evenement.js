// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth');


// Importation des controllers
const evenementCtrl = require('../controllers/evenement.js');


// Déclaration des routes Film
router.get('/', evenementCtrl.getAllEvents);
router.get('/:id', evenementCtrl.getOneEvent);
router.post('/', auth, evenementCtrl.addEvent);
router.delete('/:id', auth, evenementCtrl.deleteEvent);



// Exportation du router
module.exports = router;
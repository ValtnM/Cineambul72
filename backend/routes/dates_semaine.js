// Création du router
const express = require('express');
const router = express.Router();

// Importation des middleware
const auth = require('../middleware/auth');

// Importation des controllers
const datesSemaineCtrl = require('../controllers/dates_semaine.js');

// Déclaration des routes Dates_semaine
router.get('/', datesSemaineCtrl.getDates);
router.put('/', auth, datesSemaineCtrl.modifyDates);


// Exportation du router
module.exports = router;
// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth');


// Importation des controllers
const seanceCtrl = require('../controllers/seance.js');


// Déclaration des routes Séance
router.get('/:filmId', seanceCtrl.getSpecialSeance);
router.post('/:filmId', seanceCtrl.addSeance);
router.get('/circuit/:filmId', seanceCtrl.getCircuitSeances);
router.get('/royal/:filmId', seanceCtrl.getRoyalSeances);
router.get('/mulsanne/:filmId', seanceCtrl.getMulsanneSeances);
router.delete('/:id', auth, seanceCtrl.deleteSeance);
router.delete('/', auth, seanceCtrl.deleteOldSeance);


// Exportation du router
module.exports = router;
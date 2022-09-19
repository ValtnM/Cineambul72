// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth');


// Importation des controllers
const communeCtrl = require('../controllers/commune.js');


// Déclaration des routes Like
router.get('/', communeCtrl.getAllCommune);
router.post('/', auth, communeCtrl.addCommune);
router.delete('/:id', auth, communeCtrl.deleteCommune);
router.put('/:id', auth, communeCtrl.modifyCommune);



// Exportation du router
module.exports = router;
// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
// const auth = require('../middleware/auth');


// Importation des controllers
const filmCtrl = require('../controllers/film.js');


// Déclaration des routes Like
router.get('/', filmCtrl.getAllFilms);
router.post('/', filmCtrl.addFilm);
// router.get('/', communeCtrl.getAllCommune);
// router.post('/', communeCtrl.addCommune);
// router.delete('/:id', communeCtrl.deleteCommune);
// router.put('/:id', communeCtrl.modifyCommune);



// Exportation du router
module.exports = router;
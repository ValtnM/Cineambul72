// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
// const auth = require('../middleware/auth');


// Importation des controllers
const seanceCtrl = require('../controllers/seance.js');


// Déclaration des routes Like
// router.get('/', filmCtrl.getAllFilms);
// router.get('/:id', filmCtrl.getOneFilm);
router.post('/:filmId', seanceCtrl.addSeance);
// router.get('/', communeCtrl.getAllCommune);
// router.post('/', communeCtrl.addCommune);
// router.delete('/:id', communeCtrl.deleteCommune);
// router.put('/:id', communeCtrl.modifyCommune);



// Exportation du router
module.exports = router;
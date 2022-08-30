// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
// const auth = require('../middleware/auth');


// Importation des controllers
const filmCtrl = require('../controllers/film.js');


// Déclaration des routes Like
router.get('/', filmCtrl.getAllFilms);
router.get('/semaine', filmCtrl.getWeekFilm);
router.get('/circuit', filmCtrl.getFilmByLieu);
router.get('/royal', filmCtrl.getFilmByLieu);
router.get('/mulsanne', filmCtrl.getFilmByLieu);
router.get('/special', filmCtrl.getSpecialFilm);
router.get('/:id', filmCtrl.getOneFilm);
router.post('/', filmCtrl.addFilm);
router.delete('/:id', filmCtrl.deleteFilm);
// router.get('/', communeCtrl.getAllCommune);
// router.post('/', communeCtrl.addCommune);
// router.delete('/:id', communeCtrl.deleteCommune);
// router.put('/:id', communeCtrl.modifyCommune);



// Exportation du router
module.exports = router;
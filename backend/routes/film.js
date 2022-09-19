// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const auth = require('../middleware/auth');


// Importation des controllers
const filmCtrl = require('../controllers/film.js');


// Déclaration des routes Film
router.get('/', filmCtrl.getAllFilms);
router.get('/semaine', filmCtrl.getWeekFilm);
router.get('/circuit', filmCtrl.getFilmByLieu);
router.get('/royal', filmCtrl.getFilmByLieu);
router.get('/mulsanne', filmCtrl.getFilmByLieu);
router.get('/special', filmCtrl.getSpecialFilm);
router.get('/commune/:communeId', filmCtrl.getFilmsByCommune);
router.get('/:id', filmCtrl.getOneFilm);
router.post('/', auth, filmCtrl.addFilm);
router.put('/:id', auth, filmCtrl.modifyFilm)
router.delete('/:id', auth, filmCtrl.deleteFilm);


// Exportation du router
module.exports = router;
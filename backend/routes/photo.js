// Création du router
const express = require('express');
const router = express.Router();

// Importation des middleware
const multer = require('../middleware/multer.js')
const auth = require('../middleware/auth');

// Importation des controllers
const photoCtrl = require('../controllers/photo.js');

// Déclaration des routes Photo
router.get('/:communeId', photoCtrl.getPhotoCommune);
router.get('/salle/:salle', multer, photoCtrl.getPhotoSalle);
router.post('/:communeId', auth, multer, photoCtrl.addPhotoCommune);
router.post('/salle/:salle', auth, multer, photoCtrl.addPhotoSalle);
router.delete('/:nom', auth, photoCtrl.deletePhoto);

// Exportation du router
module.exports = router;
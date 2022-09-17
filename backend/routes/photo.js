// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
const multer = require('../middleware/multer.js')
// const auth = require('../middleware/auth');


// Importation des controllers
const photoCtrl = require('../controllers/photo.js');


// Déclaration des routes Like
router.get('/:communeId', photoCtrl.getPhotoCommune);
router.get('/salle/:salle', multer, photoCtrl.getPhotoSalle);
router.post('/:communeId', multer, photoCtrl.addPhotoCommune);
router.post('/salle/:salle', multer, photoCtrl.addPhotoSalle);
router.delete('/:nom', photoCtrl.deletePhoto);
// router.post('/:postId/comment', auth, commentCtrl.createComment);
// router.delete('/comment/:commentId', auth, commentCtrl.deleteComment);



// Exportation du router
module.exports = router;
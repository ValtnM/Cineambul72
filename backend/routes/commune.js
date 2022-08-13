// Création du router
const express = require('express');
const router = express.Router();


// Importation des middleware
// const auth = require('../middleware/auth');


// Importation des controllers
const communeCtrl = require('../controllers/commune.js');


// Déclaration des routes Like
router.get('/', communeCtrl.getAllCommune);
// router.get('/:communeId', communeCtrl.getPhotoCommune);
// router.post('/:postId/comment', auth, commentCtrl.createComment);
// router.delete('/comment/:commentId', auth, commentCtrl.deleteComment);



// Exportation du router
module.exports = router;
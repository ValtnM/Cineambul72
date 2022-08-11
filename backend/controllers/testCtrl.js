// Importation des modules
// const jwtUtils = require('../utils/jwt.utils.js');

// Importation des models
const models = require('../models');

// Récupération des commentaires d'un post
// exports.getAllComments = (req, res, next) => {
//     const postId = req.params.postId;
//     // console.log(postId);

//     models.Comment.findAll({
//          where: {
//               postId: postId 
//         },
//         include: [{
//                 model: models.User,
//                 attributes: ['id','firstname', 'lastname', 'photo']
//         }]
//     })
//         .then(comments => res.status(200).json(comments))
//         .catch(() => res.status(400).json({ error: "Commentaire non trouvé !" }))
// }


// Création d'un commentaire
exports.premierTest = (req, res , next) => {
    // console.log("AHAHAHAH");
    // res.status(200).json({ messsage: "Test réussi ! "})

    models.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({error }));

    // models.Commune.findAll({

    // })
    //     .then((commune => {
    //         console.log(commune);
    //         if(commune) {
    //             res.status(200).json(commune)
    //         } else {
    //             res.status(404).json({'erreur': "Aucune commune trouvée !"})
    //         }
    //     }))
    //     .catch(err => {
    //         res.status(500).json({"erreur": "Erreur"})
    //     })
}


// exports.deleteComment = (req, res, next) => {
//     const commentId = req.params.commentId;

//     models.Comment.destroy({ where: { id: commentId } })
//         .then(() => res.status(200).json({ message: "Le commentaire a été supprimé !" }))
//         .catch(() => res.status(400).json({ error: "La suppression du commentaire a échoué !" }))
// }
const models = require('../models');


exports.createMessage = (req, res, next) => {
    if(!req.body.type) {
        res.json({erreur: "Aucun type n'a été indiqué"})
    } else if (!req.body.texte) {
        res.json({erreur: "Aucun texte n'a été inscrit"})
    } else {
        models.Message.create({
            ...req.body
        })
        .then(() => res.status(200).json({message: "Message créé avec succès"}))
        .catch(() => res.status(400).json({erreur: "Échec de la création du message"}))
    }
}
const models = require('../models');


// Récupération des message selon la page indiquée
exports.getMessage = (req, res, next) => {
    const pageName = req.params.pageName;
    models.Message.findAll({where: {[pageName]: true}})
    .then(messages => res.status(200).json(messages))
    .catch(err => res.status(404).json({err}))
}

// Création d'un nouveau message
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

// Suppression d'un message
exports.deleteMessage = (req, res, next) => {
    messageId = req.params.messageId;    
    models.Message.destroy({where: {id: messageId}})
    .then(() => res.status(200).json({message: "Message effacé"}))
    .catch((err) => res.status(500).json({err}))
}
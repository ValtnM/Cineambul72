const models = require('../models');

exports.getAllEvents = (req, res, next) => {
    models.Evenement.findAll()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(404).json(err))
}

exports.getOneEvent = (req, res, next) => {
    eventId = req.params.id;
    models.Evenement.findOne({where: {id: eventId}})
    .then(event => res.status(200).json(event))
    .then(err => res.status(404).json(err))
}

exports.addEvent = (req, res, next) => {
    models.Evenement.create({
        ...req.body
    })
    .then(() => res.status(200).json({message: "Évènement créé avec succès !"}))
    .catch(() => res.status(500).json({erreur: "Échec lors de la création de l'évènement"}))
}

exports.deleteEvent = (req, res, next) => {
    models.Evenement.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({message: "Évènement supprimé !"}))
    .catch((err) => res.status(500).json(err))
}
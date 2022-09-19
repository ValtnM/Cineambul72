const models = require('../models');

// Récupération des dates de la semaine
exports.getDates = (req, res, next) => {
    models.DatesSemaine.findOne({ where: { id: 1 }})
    .then(dates => res.status(200).json(dates))
    .catch(err => res.status(404).json({err}))
}

// Modification des dates de la semaine
exports.modifyDates = (req, res, next) => {
    models.DatesSemaine.findOne({where: {id: 1}})
    .then(dates =>{
        dates.update({
            ...req.body
        })
        .then(() => res.status(200).json({message: "Dates misent à jour !"}))
        .catch((err) => res.status(500).json({err}))
    })
    .catch((err) => res.status(404).json({err}))
}
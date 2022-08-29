const models = require('../models');


exports.deleteSeance = (req, res, next) => {
    const seanceId = req.params.id;
    models.Seance.destroy({where: { id: seanceId }})
    .then(() => res.status(200).json({message: "Séance supprimée !"}))
    .catch(err => res.status(500).json({err}))
}


exports.getSpecialSeance = (req, res, next) => {
    const filmId = req.params.filmId;

    models.Seance.findOne({
        where: {FilmId: filmId},
        include: [{
            model: models.Commune,
            attributes: ['salleCommune']
        }]
    })
    .then((seance => {
        res.json(seance)
    }))
    .catch(err => console.log(err))
}



exports.getMulsanneSeances = (req, res, next) => {
    const filmId = req.params.filmId;

    models.Seance.findAll({
        where: {FilmId: filmId, lieu: "mulsanne"},
    })
    .then((seances) => res.status(201).json(seances))
    .catch(() => res.status(404).json({erreur: "Aucune séance trouvée !"}))
}

exports.getRoyalSeances = (req, res, next) => {
    const filmId = req.params.filmId;

    models.Seance.findAll({
        where: {FilmId: filmId, lieu: "royal"}        
    })
    .then((seances) => res.status(201).json(seances))
    .catch(() => res.status(404).json({erreur: "Aucune séance trouvée !"}))
}

exports.getCircuitSeances = (req, res, next) => {
    const filmId = req.params.filmId;

    console.log(filmId);

    models.Seance.findAll({
        where: {FilmId: filmId, lieu: "circuit"},
        include: [{
            model: models.Commune,
            attributes: ['nom', 'salleNom'],
        }],
        order: [[models.Commune, 'nom', 'ASC']]
    })
    .then((seances) => res.status(201).json(seances))
    .catch(() => res.status(404).json({erreur: "Aucune séance trouvée !"}))
}


exports.addSeance = (req, res, next) => {

    console.log(req.body);
    if(!req.body.lieu){
        res.status(500).json({erreur: "Veuillez renseigner un lieu"})
    } else if (req.body.lieu === "circuit" && !req.body.commune) {
        res.status(500).json({erreur: "Veuillez selectionner une commune"})
    } else if (!req.body.date) {
        res.status(500).json({erreur: "Veuillez renseigner une date"})
    } else if (!req.body.heure) {
        res.status(500).json({erreur: "Veuillez renseigner une heure"})
    }

    let communeId = null;
    if(req.body.commune){
        communeId = req.body.commune.id
    }    

    const filmId = req.params.filmId;

    models.Film.findOne({
        attributes: ['special'],
        where: {id: filmId},
    })
    .then(film => {
        models.Seance.create({
            FilmId: filmId,
            CommuneId: communeId,
            date: req.body.date,
            heure: req.body.heure,
            special: film.special,
            salle: req.body.salle,
            infoComplementaire: req.body.infoComplementaire,
            lieu: req.body.lieu,
            langue: req.body.langue
        })
        .then(() => res.status(200).json({message: "Séance ajoutée !"}))
        // .catch(() => res.status(500).json({erreur: "Echec de l'ajout de la séance !"}))
        .catch((err) => res.status(500).json({err}))
    })
    .catch((err) => res.status(404).json({err}))
    
}
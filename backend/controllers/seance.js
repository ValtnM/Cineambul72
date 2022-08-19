const models = require('../models');


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
    

    const filmId = req.params.filmId;

    models.Film.findOne({
        attributes: ['special'],
        where: {id: filmId},
    })
    .then(film => {
        models.Seance.create({
            FilmId: filmId,
            CommuneId: req.body.commune.id,
            date: req.body.date,
            heure: req.body.heure,
            special: film.special,
            // salle: req.body.commune.salleNom,
            infoComplémentaire: req.body.infoComplementaire,
            lieu: req.body.lieu
        })
        .then(() => res.status(200).json({message: "Séance ajoutée !"}))
        // .catch(() => res.status(500).json({erreur: "Echec de l'ajout de la séance !"}))
        .catch((err) => res.status(500).json({err}))
    })
    .catch((err) => res.status(404).json({err}))
    
}
const models = require('../models');


exports.getAllFilms = (req, res, next) => {
    models.Film.findAll()
    .then(films => res.status(200).json(films))
    .catch(() => res.status(404).json({message: "Films introuvables !"}))
}


exports.addFilm = (req, res, next) => {
    console.log(req.body);
    if(!req.body.codeBetaSeries){
        return res.json({erreur: "Aucun code BetaSeries n'a été renseigné"})
    }
    if(!req.body.afficheUrl){
        return res.json({erreur: "Aucune affiche n'a été renseigné"})
    }
    if(!req.body.titre){
        return res.json({erreur: "Aucun titre n'a été renseigné"})
    }
    if(!req.body.date){
        return res.json({erreur: "Aucune date de sortie n'a été renseigné"})
    }
    if(!req.body.duree){
        return res.json({erreur: "Aucune durée n'a été renseigné"})
    }
    if(!req.body.genre){
        return res.json({erreur: "Aucun genre n'a été renseigné"})
    }
    if(!req.body.synopsis){
        return res.json({erreur: "Aucun synopsis n'a été renseigné"})
    }
    if(!req.body.realisateur){
        return res.json({erreur: "Aucun realisateur n'a été renseigné"})
    }
    models.Film.create({
        codeBetaSeries: req.body.codeBetaSeries,
        afficheUrl: req.body.afficheUrl,
        titre: req.body.titre,
        dateSortie: req.body.date,
        genre: req.body.genre,
        synopsis: req.body.synopsis,
        trailerUrl: req.body.trailerUrl,
        realisateur: req.body.realisateur,
        casting: req.body.casting,
        duree: req.body.duree,
        special: req.body.special
    })
    .then(() => res.status(201).json({message: "Le film a bien été ajouté !"}))
    .catch((err) => res.status(500).json({err}))
}


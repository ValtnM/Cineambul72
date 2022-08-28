const models = require('../models');


exports.deleteFilm = (req, res, next) => {
    const filmId = req.params.id;
    models.Film.destroy({where: {id: filmId}})
    .then(() => res.status(200).json({message: "Film supprimé !"}))
    .catch((err) => res.status(500).json({err}))
}

exports.getOneFilm = (req, res, next) => {
    const filmId = req.params.id;
    models.Film.findOne({
        where: {id: filmId}
    })
    .then(film => res.status(201).json(film))
    .catch(() => res.status(404).json({ erreur: "Film introuvable !"}))
}


// exports.getMulsanneFilms = (req, res, next) => {
//     console.log(req.body);
// }


// exports.getRoyalFilms = (req, res, next) => {
//     let filmsIdsArray=[];
//     let sortedFilmIds=[];
//     models.Seance.findAll({
//         where: {lieu: "royal"},
//         include: [{
//             model: models.Film,
//             attributes: ['id','afficheUrl']
//         }]
//     })
//     .then(seances => {
//         seances.forEach(seance => {
//             filmsIdsArray.push(seance.dataValues.Film.dataValues.id)            
//         });
        
//         filmsIdsArray.forEach(filmId => {
//             if(!sortedFilmIds.includes(filmId)){
//                 sortedFilmIds.push(filmId)
//             }
//         })

//         models.Film.findAll({
//             where: {
//                 id: sortedFilmIds
//             }
//         })
//         .then(films => res.status(200).json(films))
//         .catch(err => res.status(404).json(err))
        
//     })
//     .catch(() => res.status(404).json({erreur: "Séances introuvables !"}))
// }


exports.getFilmByLieu = (req, res, next) => {
    let filmsIdsArray=[];
    let sortedFilmIds=[];
    const lieu = req.url.split("/")[1];
    console.log(lieu);
    models.Seance.findAll({
        where: {lieu: lieu},
        include: [{
            model: models.Film,
            attributes: ['id','afficheUrl']
        }]
    })
    .then(seances => {
        seances.forEach(seance => {
            filmsIdsArray.push(seance.dataValues.Film.dataValues.id)            
        });
        
        filmsIdsArray.forEach(filmId => {
            if(!sortedFilmIds.includes(filmId)){
                sortedFilmIds.push(filmId)
            }
        })

        models.Film.findAll({
            where: {
                id: sortedFilmIds
            }
        })
        .then(films => res.status(200).json(films))
        .catch(err => res.status(404).json(err))
        
    })
    .catch(() => res.status(404).json({erreur: "Séances introuvables !"}))
}


exports.getAllFilms = (req, res, next) => {
    models.Film.findAll()
    .then(films => res.status(200).json(films))
    .catch(() => res.status(404).json({message: "Films introuvables !"}))
}


exports.addFilm = (req, res, next) => {
    console.log(req.body); 
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
        codeTMDB: req.body.codeTMDB,
        afficheUrl: req.body.afficheUrl,
        titre: req.body.titre,
        dateSortie: req.body.date,
        genre: req.body.genre,
        synopsis: req.body.synopsis,
        trailerUrl: req.body.trailerUrl,
        realisateur: req.body.realisateur,
        casting: req.body.acteurs,
        duree: req.body.duree,
        special: req.body.special
    })
    .then((response) => res.status(201).json({message: "Le film a bien été ajouté !", id: response.dataValues.id}))
    .catch((err) => res.status(500).json(err))
}


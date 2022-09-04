const models = require('../models');

exports.modifyFilm = (req, res, next) => {
    const filmId = req.params.id;
    if(!req.body.afficheUrl){
        res.status(500).json({erreur: "Aucune affiche n'a été indiquée"})
    }
    else if(!req.body.titre){
        res.status(500).json({erreur: "Aucun titre n'a été indiqué"})
    }
    else if(!req.body.dateSortie){
        res.status(500).json({erreur: "Aucune date n'a été indiquée"})
    }
    else if(!req.body.genre){
        res.status(500).json({erreur: "Aucun genre n'a été indiqué"})
    }
    else if(!req.body.synopsis){
        res.status(500).json({erreur: "Aucun synopsis n'a été indiqué"})
    }
    else if(!req.body.realisateur){
        res.status(500).json({erreur: "Aucun réalisateur n'a été indiqué"})
    }
    else if(!req.body.duree){
        res.status(500).json({erreur: "Aucune durée n'a été indiquée"})
    }
    else {

        
        models.Film.findOne({where: {id: filmId}})
        .then(film => {
            film.update({
                ...req.body
            })
            .then(() => res.status(200).json({message: "Film modifié !"}))
            .catch((err) => res.status(500).json({err}))
        })
        .catch(err => res.status(404).json({err}))
    }
}
    
    
exports.getWeekFilm = (req, res, next) => {
    let filmsIdsArray=[];
    let sortedFilmIds=[];

    models.DatesSemaine.findOne({where: {id: 1}})
    .then(dates => {
        models.Seance.findAll({
            include: [{
                model: models.Film,
                attributes: ['id','afficheUrl']
            }]
        })
        .then(seances => {
            seances.forEach(seance => {
                // console.log(seance);
                // console.log(seance.dataValues.date)
                if(seance.dataValues.date >= dates.dataValues.dateDebut && seance.dataValues.date <= dates.dataValues.dateFin){
                    filmsIdsArray.push(seance.dataValues.FilmId)   
                }
                console.log(filmsIdsArray);         
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
    })

    // console.log(req.params);
    // let filmsIdsArray=[];
    // let sortedFilmIds=[];
    // models.Seance.findAll({
    //     include: [{
    //         model: models.Film,
    //         attributes: ['id','afficheUrl']
    //     }]
    // })
    // .then(seances => {
    //     seances.forEach(seance => {
    //         if(seance.dataValues.date >= req.params.dateDebut && seance.dataValues.date <= req.params.dateFin){
    //             filmsIdsArray.push(seance.dataValues.Film.dataValues.id)            
    //         }
    //     });
        
    //     filmsIdsArray.forEach(filmId => {
    //         if(!sortedFilmIds.includes(filmId)){
    //             sortedFilmIds.push(filmId)
    //         }
    //     })

    //     models.Film.findAll({
    //         where: {
    //             id: sortedFilmIds
    //         }
    //     })
    //     .then(films => res.status(200).json(films))
    //     .catch(err => res.status(404).json(err))
        
    // })
    // .catch(() => res.status(404).json({erreur: "Séances introuvables !"}))
}


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

exports.getSpecialFilm = (req, res, next) => {
    models.Film.findAll({where: {special: true}})
    .then(films => res.status(201).json(films))
    .catch(err => statut(404).json(err))
}


exports.getFilmByLieu = (req, res, next) => {
    let filmsIdsArray=[];
    let sortedFilmIds=[];
    
    const lieu = req.url.split("/")[1];
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


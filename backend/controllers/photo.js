const models = require('../models');
const fs = require('fs');


exports.getPhotoCommune = (req, res, next) => {
    const communeId = parseInt(req.params.communeId);
    models.Photo.findAll({
        where: {
            CommuneId: communeId
        }
    })
    .then(photos => res.status(200).json(photos))
    .catch((err) => res.status(400).json(err))
}


exports.addPhotoCommune = (req, res, next) => {
    let photoName = req.file.filename;
    if(req.file.mimetype !== ("image/jpeg" || "image/jpg" || "image/png")) {
        fs.unlink(`images/${photoName}`, (error) => {
            if(error){
                console.log("Échec de suppression de l'image: " + error);
            } else {
                console.log("Image supprimée avec succès !");
            }
        })
        res.status(500).json({erreur: "Le fichier n'est pas valide"})
        
    } else {            
        models.Photo.create({
            nom: photoName,
            CommuneId: req.params.communeId
        })
        .then(() => res.status(201).json({message: "La photo à bien été ajoutée !"}))
        .catch(err => console.log(err))
    }
}


exports.getPhotoSalle = (req, res, next) => {
    const salleName = req.params.salle;
    models.Photo.findAll({
        where: {lieu: salleName}
    })
    .then(photos => {
        res.status(200).json(photos);
    })
    .catch(err => res.status(404).json({err}))
}


exports.addPhotoSalle = (req, res, next) => {
    const salleName = req.params.salle;
    let photoName = req.file.filename;
    if(req.file.mimetype !== ("image/jpeg" || "image/jpg" || "image/png")) {
        fs.unlink(`images/${photoName}`, (error) => {
            if(error){
                console.log("Échec de suppression de l'image: " + error);
            } else {
                console.log("Image supprimée avec succès !");
            }
        })
        res.status(500).json({erreur: "Le fichier n'est pas valide"})
    } else {
        models.Photo.create({
            nom: photoName,
            lieu: salleName
        })
        .then(() => res.status(200).json({message: "La photo à bien été ajoutée !"}))
        .catch(err => console.log(err))
    }
}

exports.deletePhoto = (req, res, next) => {
    models.Photo.destroy({
        where: {nom: req.params.nom}
    })
    .then(() => {
        fs.unlink(`images/${req.params.nom}`, (error) => {
            if(error) {
                console.log("Échec de suppression: " + error);
            } else {
                console.log("Photo supprimée !");
            }
        })
        res.status(200).json({message: "Photo supprimée !"})
    })
    .catch(() => res.status(500).json({erreur: "Échec de suppression de la photo"}))
}
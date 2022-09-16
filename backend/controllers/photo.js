const models = require('../models');
const fs = require('fs');


exports.getPhotoCommune = (req, res, next) => {
    const communeId = parseInt(req.params.id);
    // console.log("protocole: " + req.protocol)
    // console.log("host: "+req.get('host'));

    models.Photo.findAll({
        where: {
            CommuneId: communeId
        }
    })
    .then(photos => res.status(200).json(photos))
    .catch((err) => res.status(400).json(err))
}


exports.addPhotoCommune = (req, res, next) => {
    console.log(req);
    if(req.file.mimetype !== ("image/jpeg" || "image/jpg" || "image/png")) {
        let photoName = photo.split('/images/')[1];
        console.log("HEY");
        fs.unlink(`images/${photoName}`, (error) => {
            if(error){
                console.log("Échec de suppression de l'image: " + error);
            } else {
                console.log("Image supprimée avec succès !");
            }
        })
        res.status(500).json({erreur: "Le fichier n'est pas valide"})
        
    } else {

        const photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        
        models.Photo.create({
            nom: photo,
            CommuneId: req.params.id
        })
        .then(() => res.status(201).json({message: "La photo à bien été ajoutée !"}))
        .catch(err => console.log(err))
    }
}
const models = require('../models');


exports.getPhotoCommune = (req, res, next) => {
    const communeId = parseInt(req.params.id);

    models.Photo.findAll({
        where: {
            CommuneId: communeId
        }
    })
    .then(photos => res.status(200).json(photos))
    .catch((err) => res.status(400).json(err))
}


exports.addPhotoCommune = (req, res, next) => {
    console.log(req.params.id);

    models.Photo.create({
        nom: req.body.nom,
        CommuneId: req.params.id
    })
    .then(() => res.status(201).json({'message': "La photo à bien été ajoutée !"}))
    .catch(err => console.log(err))
}
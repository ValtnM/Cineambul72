const models = require('../models');


exports.getAllCommune = (req, res , next) => {
    models.Commune.findAll({ order: [['nom', 'ASC']]})
        .then(things => res.status(201).json(things))
        .catch(error => res.status(400).json({error }));
}

exports.addCommune = (req, res, next) => {
    const body = req.body;
    if(body.nom === "" || body.salleNom === "" || body.salleRue === "" || body.salleCommune === "" || body.salleContact === "") {
        res.status(500).json({"message": "Un ou plusieurs champs n'ont pas été renseignés"})
    } else {
        models.Commune.create({
            nom: body.nom,
            salleNom: body.salleNom,
            salleRue: body.salleRue,
            salleCommune: body.salleCommune,
            salleContact: body.salleContact
        })
        .then(() => res.status(201).json({message: "La commune à bien été ajoutée !"}))
        .catch(err => console.log(err))
    }
}

exports.deleteCommune = (req, res, next) => {
    models.Commune.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).json({"message": "Commune supprimée avec succès"}))
    .catch((err) => res.status(500).json({err}))
}

exports.modifyCommune = (req, res, next) => {
    models.Commune.findOne({where: { id: req.params.id }})
    .then(commune => {
        commune.update({
            ...req.body
        })
        .then(() => res.status(200).json({message: "Commune mise à jour !"}))
        .catch(() => res.status(500).json({erreur: "Echec de la mise à jour !"}))
    })
    .catch(() => res.status(404).json({erreur: "Commune introuvable !"}))
}
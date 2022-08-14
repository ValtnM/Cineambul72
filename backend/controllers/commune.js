const models = require('../models');


exports.getAllCommune = (req, res , next) => {
    // console.log("AHAHAHAH");

    models.Commune.findAll()
        .then(things => res.status(201).json(things))
        .catch(error => res.status(400).json({error }));


}

exports.addCommune = (req, res, next) => {
    const body = req.body;
    if(body.nom === "" || body.salleNom === "" || body.salleRue === "" || body.salleCommune === "" || body.salleContact === "") {
        console.log("ERREUR !!!");
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


// exports.getPhotoCommune = (req, res, next) => {
//     // console.log(req.params.communeId);
//     const communeId = parseInt(req.params.communeId);

//     models.Photo.findAll({
//         where: {
//             COMMUNES_id: communeId
//         }
//     })
//     .then(photos => res.status(200).json(photos))
//     // .then(() => res.status(200).json(photos))
//     .catch(() => res.status(400).json({ error: "Photos non trouvées !"}))
// }
const models = require('../models');


exports.getAllCommune = (req, res , next) => {
    // console.log("AHAHAHAH");

    models.Commune.findAll()
        .then(things => res.status(201).json(things))
        .catch(error => res.status(400).json({error }));


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
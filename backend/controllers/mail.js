const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    auth: {
        user: "cineambul72@gmail.com",
        pass: "mhtribccjfvdixea"
    }
})

exports.sendMail = (req, res, next) => {
    const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!req.body.prenom) {
        res.json({erreur: "Veuillez indiquer votre prénom"})
    } else if (!req.body.nom) {    
        res.json({erreur: "Veuillez indiquer votre nom"})
    } else if (!req.body.adresse) {
        res.json({erreur: "Veuillez indiquer une adresse email"})
    } else if(!mailRegex.test(req.body.adresse)){
        res.json({erreur: "L'adresse email n'est pas valide"})
    } else if(!req.body.sujet){
        res.json({erreur: "Veuillez indiquer le sujet de votre message"})
    } else if(!req.body.objet){
        res.json({erreur: "Veuillez renseigner un objet"})
    } else if(!req.body.message){
        res.json({erreur: "Votre message est vide"})
    } else {
        let mailDetails = {
            from: `${req.body.prenom} ${req.body.nom} <${req.body.adresse}>`,
            to: "cineambul72@gmail.com",
            subject: `${req.body.sujet}: ${req.body.objet}`,
            html: `<p>${req.body.message}</p><br><p>Expédié par ${req.body.adresse}</p>`
        }
    
        mailTransporter.sendMail(mailDetails, (err, info) => {
            if(err) {
                console.log(err, info);
                res.json({erreur: "Échec de l'envoi !"})
            } else {
                res.json({message: "Message envoyé !"})
            }
        })
    }

}
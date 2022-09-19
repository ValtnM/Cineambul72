// Importation de jsonwebtoken
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Exportation des différentes fonctions
module.exports = {

    // Création d'un nouveau token
    generateTokenForUser: () => {
        return jwt.sign(
        {
            userName: process.env.USER_NAME,
            password: process.env.PASSWORD,
        }, 
        'SECRET_KEY_TOKEN',
        { expiresIn: '4h' }        
        )
    },

    // // Formatage du token
    // parseAuthorization: (authorization) => {
    //     return (authorization != null) ? authorization.replace('Bearer ', '') : null;        
    // },

    // // Récupération de l'ID de l'utilisateur dans le token
    // getUserId: (authorization) => {
    //     let userId = -1;
    //     const token = module.exports.parseAuthorization(authorization);
        
    //     if(token != null) {
    //         try {
    //             const jwtToken = jwt.verify(token, process.env.TOKEN_KEY);
    //             if(jwtToken != null) {
    //                 userId = jwtToken.userId;
    //             }
    //         } catch (err) { 
    //             console.log(err);
    //         }
    //     }
    //     return userId;
    // }
}
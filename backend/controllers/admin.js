const jwt = require('jsonwebtoken')
require('dotenv').config();

// Connexion de l'administrateur
exports.login = (req, res, next) => {
    const username = req.params.username;
    const password = req.params.password;

    if(username === process.env.USER_NAME && password === process.env.PASSWORD){
        res.status(200).json({
            isAdmin: true,
            token: jwt.sign(
                {
                    userName: process.env.USER_NAME,                    
                }, 
                process.env.TOKEN_KEY,
                { expiresIn: '4h' }        
                )
        })
    } else {
        res.status(401).json({isAdmin: false})
    }
}

// Vérification du token administrateur
exports.checkToken = (req, res, next) => {
    let token = req.params.token;
    if(token != null) {
        try {
            let jwtToken = jwt.verify(token, process.env.TOKEN_KEY);
            if(jwtToken.userName === process.env.USER_NAME) {
                res.status(201).json({isAdmin: true})
            } else {
                res.status(401).json({isAdmin: false})
            }
        } catch (err) {
            console.log(err);
        }
    }
}


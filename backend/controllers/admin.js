require('dotenv').config();

exports.checkAdminUser = (req, res, next) => {
    const username = req.params.username;
    const password = req.params.password;

    if(username === process.env.USER_NAME && password === process.env.PASSWORD){
        res.json(true)
    } else {
        res.json(false)
    }
}
const webtoken = require("jsonwebtoken");
const User = require("../model/user");
const secret = "mancity"

// authentication 
const authenticateUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        webtoken.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.redirect("/register")
            } else {
                next()
            }
        })
    } else {
        res.redirect("/register")
    }
}

// check user using locals 
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        webtoken.verify(token, secret, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next()
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
}

module.exports = { authenticateUser, checkUser }
const User = require("../model/user");
const bcrypt = require("bcrypt");
const webtoken = require("jsonwebtoken");
const secret = "mancity";
const expiry = 60 * 60 * 1;

const createToken = (id) => {
    return webtoken.sign({id}, secret, {expiresIn: expiry})
};

exports.register = (req, res) => {
    res.render("register")
};

exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    const image = req.file.filename;
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({name, email, image, password: hash})
    user.save()
    const token = createToken(user._id)
    res.cookie("jwt", token, {httpOnly: true, maxAge: expiry * 1000})
    res.redirect("/")
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user) {
        const validation = await bcrypt.compare(password, user.password)
        if(validation) {
            const token = createToken(user._id);
            res.cookie("jwt", token, {httpOnly: true, maxAge: expiry * 1000})
            res.redirect("/")
        } else {
            res.send("Invalid email or password")
        }
    } else {
            res.send("Email not available")
    }
    
};

exports.logout = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect("/register")
};

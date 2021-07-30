const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: String
})

module.exports = mongoose.model("User", userschema)
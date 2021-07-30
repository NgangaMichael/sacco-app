const mongoose = require("mongoose");
const saccoschema = new mongoose.Schema({
    _id: Number,
    name: String,
    road: String,
    units: Number,
    about: String,
    image: String,
});

module.exports = mongoose.model("Sacco", saccoschema);
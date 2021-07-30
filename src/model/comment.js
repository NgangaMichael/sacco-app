const mongoose = require("mongoose");
const commentschema = new mongoose.Schema({
    comment: String,
})

module.exports = mongoose.model("Comment", commentschema)
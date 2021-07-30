const express = require("express");
const app = express();
const mongoose = require("mongoose");
module.exports = () => {
    mongoose.connect("mongodb://localhost:27017/saccoapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(results => console.log("Connected DB"))
    .catch(err => console.log("Err on DB", err))
}
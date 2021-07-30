const Sacco = require("../model/sacco");
const Comment = require("../model/comment");

exports.allsaccos = async (req, res) => {
    const sacco = await Sacco.find()
    res.render("allsaccos", {sacco})
};

exports.addsaccoRoute = (req, res) => {
    res.render("addsacco")
};

exports.addsacco = async (req, res) => {
    const newSacco = await new Sacco({
        name: req.body.name,
        road: req.body.road,
        units: req.body.units,
        about: req.body.about,
        image: req.file.filename
    });
    newSacco._id = Math.random();
    await newSacco.save()
    res.redirect("/")
};

exports.saccodetails = async (req, res) => {
    const {id} = req.params;
    const sacco = await Sacco.findById(id)
    const comment = await Comment.find()
    res.render("details", {sacco, comment})
};

exports.editroute = async (req, res) => {
    const {id} = req.params;
    const sacco = await Sacco.findById(id)
    res.render("edit", {sacco})
};

exports.editdetails = async (req, res) => {
    const {id} = req.params;
    const {name, about, units, road} = req.body;
    const sacco = await Sacco.findByIdAndUpdate(id, {
        "units": units, 
        "road": road,
        "name": name,
        "about": about,
        // image: req.file.filename
    })
    sacco.save()
    res.redirect("/details/"+id)
};

exports.deletesacco = async (req, res) => {
    const {id} = req.params;
    const sacco = await Sacco.findByIdAndDelete(id)
    res.redirect("/")
};

exports.notfound = (req, res) => {
    res.render("notfound")
};
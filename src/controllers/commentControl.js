const Comment = require("../model/comment");

exports.addComment = async (req, res) => {
    const {id} = req.params;
    const newComment = await new Comment(req.body)
    newComment.save()
    res.redirect("/details/"+id)
};
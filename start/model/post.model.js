const mongoose = require('mongoose');

const Post = new mongoose.Schema(
    {
        title: String,
        text: String,
        comment: String,
    },
    { timestamps: true }
);

module.exports.Post = mongoose.model('Post', Post);
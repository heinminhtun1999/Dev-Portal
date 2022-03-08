const mongoose = require("mongoose");
const { Schema } = mongoose;

const developerSchema = new Schema({
    login: String,
    avatar_url: String,
    name: String,
    company: String,
    blog: String,
    bio: String,
    location: String,
    email: String,
    github_id: Number,
    linkedin_id: Number,
    codechef_id: Number,
    hackerrank_id: Number,
    twitter_id: Number,
    medium_id: Number,
    repos: [
        {
            name: String,
            html_url: String,
            description: String,
            updated_at: String
        }
    ]
});

const Developer = mongoose.model("Developer", developerSchema);

module.exports = Developer;
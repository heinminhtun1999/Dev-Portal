const express = require("express");
const router = express.Router();
const Developer = require("../models/developers");
const axios = require("axios");
const CatchAsync = require("../utlis/CatchAsync");
const mongoose = require("mongoose");

router.get("/developers", CatchAsync(async (req, res) => {
    const developers = await Developer.find();
    return res.status(200).json(developers);
}));

router.get("/developers/:id", CatchAsync(async (req, res) => {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) return res.status(400).send("Not a valid id");
    const developer = await Developer.findById(id);
    if (!developer) return res.status(404).send("User doesn't exist!");
    return res.status(200).json(developer);
}));

router.post("/developers", CatchAsync(async (req, res) => {
    const { github_id, linkedin_id, codechef_id, hackerrank_id, twitter_id, medium_id } = req.body;
    if (!github_id) return res.status(400).send("Github Id is needed!");
    const userInfoRes = await axios({ url: `https://api.github.com/user/${github_id}`, method: "get" });
    const userInfo = { ...userInfoRes.data };
    const userReposRes = await axios({ url: `https://api.github.com/users/${userInfo.login}/repos`, method: "get" });
    const userRepos = [...userReposRes.data].map(u => ({ name: u.name, html_url: u.html_url, description: u.description, updated_at: u.updated_at }));
    const developer = {
        login: userInfo.login,
        avatar_url: userInfo.avatar_url,
        name: userInfo.name,
        company: userInfo.company,
        blog: userInfo.blog,
        location: userInfo.location,
        email: userInfo.email,
        github_id,
        linkedin_id,
        codechef_id,
        hackerrank_id,
        twitter_id,
        medium_id,
        bio: userInfo.bio,
        repos: userRepos
    }
    const dev = await Developer.findOneAndUpdate({ github_id }, developer, { upsert: true, new: true });
    return res.status(200).json(dev);
}));

module.exports = router;
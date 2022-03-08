const express = require("express");
const cors = require("cors");
const ExpressError = require("./utlis/ExpressError");

// modules

const connectDB = require("./db");

connectDB();

const app = express();

// Middlewares

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Routes

const developer = require("./routes/developers");

app.use("/api", developer)

app.get("/", (req, res) => {
    res.send("Server Up & Running")
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Not Found!"));
})

app.use((err, req, res, next) => {
    if (err.response) {
        err.statusCode = err.response.status;
        err.message = err.response.data.message;
    }
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong";
    return res.status(statusCode).send(err.message);
});

app.listen(5000, () => {
    console.log("API Server running on PORT: 5000");
});
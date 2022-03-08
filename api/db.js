const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/devdb", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Mongdb Connected");
    } catch (e) {
        console.log(e);
    }
}


module.exports = connectDB;
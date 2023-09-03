const mongoose = require("mongoose");

module.exports = () => {
    //Mongoose connection
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PW,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("mongodb connected.")
    }).catch(err => console.log(err.message));

    //Logging mongoose connected
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to database.");
    });
    //Logging mongoose connection error
    mongoose.connection.on("error", err => {
        console.log(err.message);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("hello")
    })
    // Logging mongoose disconnecting due to closing app
    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log("Database connection closed due to app termination.");
            process.exit(0);
        });
    });
};
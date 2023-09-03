const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const app = express();

//Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Initialize database
require("./initDB")();

//Routes
const usersRoute = require("./api/routes/UsersRoute");
const recipesRoute = require("./api/routes/RecipesRoute");

app.use("/api/users", usersRoute);
app.use("/api/recipes", recipesRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

//Port
const port = process.env.PORT || 3000;
//App listener
app.listen(port, () => {
    console.log(`Server running on ${port}.`);
});
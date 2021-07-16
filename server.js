/*
mkdir, cd into the dir
touch server.js .env .gitignore
mkdir views models
touch views/index.ejs views/show.ejs 
npm init -y
npm i express dotenv ejs method-override mongoose
npm install -D nodemon
code .
in .gitignore .env and node_modules/ 
in .env PORT=3000
in server.js set up file, in package.json, edit "start": "nodemon server.js"
open up mongo compass to have a visual on the database, connect using url after connecting
*/

// Dependecy
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
// const Pokemon = require("./models/pokemon");
const mongoose = require("mongoose");

// Config
app.use(express.urlencoded({ extended: false })); 
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// INDEX route
app.get("/products", (req, res) => {
    res.send("Index is working");
  });

// Listening
app.listen(PORT, () => {
    console.log("Mongoose Store running on port: ", PORT);
  });
  
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

// DEPENDENCY
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
const Products = require("./models/products");
const mongoose = require("mongoose");

// CONFIG
app.use(express.urlencoded({ extended: false })); 
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/productstore", {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
},() => {
  console.log("the connection with mongod is established");
});

// INDEX ROUTE
app.get("/products", (req, res) => {
   // res.send("Index is working");
   Products.find({}, (error, products) => {
        res.render("index", {products});
      });
  });

// LISTENING
app.listen(PORT, () => {
    console.log("Mongoose Store running on port: ", PORT);
  });
  
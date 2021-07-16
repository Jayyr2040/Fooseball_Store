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
const Products = require("./models/product");
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

// SEED ROUTE
app.get('/products/seed', (req,res) => {
    Products.remove({},(error,products) => {
        Products.create([
        {
          name: "Beans",
          description: "A small pile of beans. Buy more beans for a big pile of beans.",
          img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
          price: 5,
          qty: 99
        },
        {
            name: 'Bones',
            description: 'It\'s just a bag of bones.',
            img: 'http://bluelips.com/prod_images_large/bones1.jpg',
            price: 25,
            qty: 0
          }, {
            name: 'Bins',
            description: 'A stack of colorful bins for your beans and bones.',
            img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
            price: 7000,
            qty: 1
          }
      ],(error,products) => {
        res.redirect("/products");
      }
      )
    })
  });

// LISTENING
app.listen(PORT, () => {
    console.log("Mongoose Store running on port: ", PORT);
  });
  
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
photos and info reference from www.manutd.com and media.tacdn.com
*/

// DEPENDENCY
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const methodOverride = require("method-override");
const Products = require("./models/product");
const seedData = require('./models/seed_products.js');
const mongoose = require("mongoose");
// ADDITIONAL INPUTS FOR CUSTOMER
const Customers = require("./models/customer");
const seedcustomer = require('./models/seed_customer.js');

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

// INDEX PAGE FOR PRODUCTS
app.get("/products", (req, res) => {
   // res.send("Index is working");
   Products.find({}, (error, products) => {
        res.render("index", {data: products});
      });
  });

// INDEX PAGE FOR CUSTOMER - ONLY ONE NOW
app.get("/products/customer", (req, res) => {
  Customers.find({}, (error, customer) => {
         res.render("customer", {data: customer[0]});
       });
   });

// SEED ROUTE - Press BUTTON ON FOOSEBALL STORE AT INDEX TO SEED
app.get('/products/seed', (req,res) => {

  // FOR PRODUCTS
    Products.deleteMany({},(error,products) => {
        Products.create(seedData
      ,(error,products) => {
     //   res.redirect("/products");
      }
      )
    });

  // FOR CUSTOMERs
    Customers.deleteMany({},(error,customer) => {
      Customers.create(seedcustomer
      ,(error,customer) => {
        res.redirect("/products");
      }
      )
    })
  });


// CREATE NEW PRODUCT
app.post("/products", (req, res) => {
    Products.create(req.body, (error, createdProduct) => {
      console.log("Created Product", createdProduct);
      res.redirect("/products");
    });
  });

// NEW ROUTE
app.get("/products/new", (req, res) => {
    res.render("new");
  });
  

// SHOW ROUTE
app.get("/products/:id", (req, res) => {
    const pos = req.params.id;
    Products.findById(pos, (error,product) => {
     res.render("show",{data: product, pos: pos});
    })
  });

// UPDATE - EDIT ROUTE
app.put('/products/:id', (req, res) => {
    const pos  = req.params.id; 
    const product = {...req.body}
    Products.findByIdAndUpdate(pos,product,{new:true},(err,product) => {
      res.render("show",{data: product, pos: pos}); 
     }
     )
     });

//// SHOW EDIT form
app.get('/products/:id/edit', (req, res) => {
    const pos = req.params.id;
    Products.findById(pos,(error,product) => {
      res.render("edit",{data: product, pos: pos})
    }
    )
    });

//// DELETE ROUTE
app.delete('/products/:id', (req, res) => {
    const pos = req.params.id;
    Products.findByIdAndRemove(pos, (err,fruit) => {
          res.redirect("/products");
        }
          )
       });

//// ADD TO CART ROUTE - FOR CUSTOMER
app.put('/products/addtocart/:id', (req,res) => {
  const pos = req.params.id;
  Products.findByIdAndUpdate(pos, {$inc: {qty: -1}} ,{new:true},(err,product) => {
    Customers.findOneAndUpdate({},{$push: {cart: product.name, price: product.price}},
      (error,customer) => {
      }
      )
    res.render("show",{data: product, pos: pos}); 
   }
   )
}
)
    
// LISTENING
app.listen(PORT, () => {
    console.log("Mongoose Store running on port: ", PORT);
  });
  
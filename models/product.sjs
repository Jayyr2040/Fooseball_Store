const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
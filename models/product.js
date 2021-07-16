const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    img: String,
    price: {type: Number, min: 0},
    qty: {type: Number, min: 0}
});

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
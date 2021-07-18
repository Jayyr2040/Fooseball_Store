const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    cart: Array,
    price: Array
})

const Customer = mongoose.model("Customer", userSchema)

module.exports = Customer
const mongoose = require('mongoose')

const schema = mongoose.Schema;

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    thumbnail: String,
})

module.exports = mongoose.model('Item', itemSchema)
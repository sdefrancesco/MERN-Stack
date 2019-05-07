const mongoose = require('mongoose')
let Schema = mongoose.Schema
let user = new mongoose.Schema({
    name: {
        first: String,
        last: String
    }, 
    bio: String,
    email: String,
    password: String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

let userSchema = mongoose.model('User', user)

module.exports = userSchema
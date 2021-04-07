const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const UserSchema = new Schema ({
    username: String, 
    password: String
})

// Export model
const User = mongoose.model('User', UserSchema); 

// Exports the User variable so that when other files require this file, they know to grab it
module.exports = User 
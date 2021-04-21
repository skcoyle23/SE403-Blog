const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt')

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

/*
* Allows us to change user data before saving it into the database
*/
UserSchema.pre('save', function(next) {
    const user = this // User first being saved

    /*
    * Takes in the password to be hashed w/ 10 encryptions
    * More hashing = more securing, but slower the process
    */
    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash
        next()
    })
})

// Export model
const User = mongoose.model('User', UserSchema); 

// Exports the User variable so that when other files require this file, they know to grab it
module.exports = User 
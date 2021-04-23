const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
    const { username, password } = req.body;
    
    User.findOne({username:username}, (error,user) => {
        if (user){
            bcrypt.compare(password, user.password, 
                (error, same) => {        
                    if(same){ // if passwords match
                        req.session.userId = user._id
                        // store user session, will talk about it later
                        return res.redirect('/') 
                     } 
                    else {
                        const validationErrors = ["Invalid username or password"]; 
                        req.flash('validationErrors', validationErrors); 
                        req.flash('data', req.body); 
                        
                       return res.redirect('/auth/login')
                 }
                })
        } 
        else{
            const validationErrors = ["Invalid username or password"]; 
            req.flash('validationErrors', validationErrors); 
            req.flash('data', req.body); 
            
           return res.redirect('/auth/login')
        }
    })
}


const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const BlogPostSchema = new Schema ({
    title: String, 
    body: String, 
    username: String, 
    datePosted: { 
        type: Date, 
        default: new Date()
    }
})

// Access database 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema); 

// Exports the BlogPost variable so that when other files require this file, they know to grab it
module.exports = BlogPost 
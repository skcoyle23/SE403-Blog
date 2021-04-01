const express = require('express')
//const path = require('path')

const app = new express()
const ejs = require('ejs')

app.set('view engine', 'ejs') // Tells Express to use EJS as templating engine

// Connecting to MongoDB from Node
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser: true}); 
 
// Using bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 
//const BlogPost = require('./models/BlogPost.js')
app.use(express.static('public'))

// Request handler for '/posts/store'
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Creating custom middleware
const customMiddleWare = (req, res, next) => {
  console.log('Custom middleware called')
  next() // Tells Express that the middleware is done
}
app.use(customMiddleWare)

const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store',validateMiddleWare)

// Import controllers 
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})

app.get('/', homeController)

app.get('/post/:id', getPostController)

/*
app.get('/posts/new', (req, res)=>{
  // Model creates a new doc with browser data
    res.render('create'); 
}) */

app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController)
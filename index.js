const express = require('express')
const path = require('path')

const app = new express()
const ejs = require('ejs')

app.set('view engine', 'ejs') // Tells Express to use EJS as templating engine

// Connecting to MongoDB from Node
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser: true}); 
 
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
 
const BlogPost = require('./models/BlogPost.js')
app.use(express.static('public'))

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})

app.get('/', async (req,res)=>{
   //res.sendFile(path.resolve(__dirname, 'index.html'))
   const blogposts = await BlogPost.find({})
   res.render('index', {
       blogposts
   }); 
})

app.get('/about', (req,res)=>{
    //res.sendFile(path.resolve(__dirname, 'about.html'))
    res.render('about')
})

app.get('/contact', (req,res)=>{
   // res.sendFile(path.resolve(__dirname, 'contact.html'))
   res.render('contact')
})

/*
app.get('/post', (req,res)=>{
    // res.sendFile(path.resolve(__dirname, 'post.html'))
    res.render('post')
 }) */

 app.get('/post/:id', async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
 })

app.get('/posts/new', (req, res)=>{
  // Model creates a new doc with browser data
    res.render('create'); 
})

app.post('/posts/store', async (req, res)=>{
    // Model creates a new doc with browser data
      await BlogPost.create(req.body)
      res.redirect('/')
  })
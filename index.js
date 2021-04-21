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

const validateMiddleWare = require("./middleware/validationMiddleware");

app.use('/posts/store',validateMiddleWare)

// Import controllers 
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')

const redirectIfAuthenticatedMessage = require('./middleware/redirectIfAuthenticatedMessage')

app.get('/auth/login', redirectIfAuthenticatedMessage, loginController);

const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')
app.get('auth/logout', logoutController)

const flash = require('connect-flash');
app.use(flash());

app.use((req, res) => res.render('notfound'));

global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()   
});

// Register express session middleware 
const expressSession = require('express-session'); 

// secret used to sign and encrypt the session ID cookie being shared w/ browser
app.use(expressSession( {
  secret: 'keyboard cat' // This can be changed to whatever
}))

// Import authMiddleware
const authMiddleware = require('./middleware/authMiddleware')

app.get('/posts/new', authMiddleware, newPostController)

app.post('/users/login', redirectIfAuthenticatedMessage, loginUserController)

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})

/*
*Adding routes to the above controllers
*/
app.get('/', homeController)

app.get('/post/:id', getPostController)

/*
app.get('/posts/new', (req, res)=>{
  // Model creates a new doc with browser data
    res.render('create'); 
}) */

//app.get('/posts/new', newPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/auth/register', redirectIfAuthenticatedMessage, newUserController) // Applying a route to newUserController
app.post('/users/register', redirectIfAuthenticatedMessage, storeUserController) 
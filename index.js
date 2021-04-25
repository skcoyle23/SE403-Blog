const express = require('express')

// Using bodyparser
const bodyParser = require('body-parser')
const ejs = require('ejs')

// Register express session middleware 
const expressSession = require('express-session'); 

const app = new express()
app.use(express.static('public'))

app.set('view engine', 'ejs') // Tells Express to use EJS as templating engine

// Connecting to MongoDB from Node
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser: true}); 
 
//const BlogPost = require('./models/BlogPost.js')

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
const homeController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// Import authMiddleware
const authMiddleware = require('./middleware/authMiddleware')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const flash = require('connect-flash');
app.use(flash());

// secret used to sign and encrypt the session ID cookie being shared w/ browser
app.use(expressSession( {
  secret: 'keyboard cat' // This can be changed to whatever
}))


/*
*Adding routes to the above controllers
*/
app.get('/', homeController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/post/:id', getPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController) // Applying a route to newUserController
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)

/*
app.get('/posts/new', (req, res)=>{
  // Model creates a new doc with browser data
    res.render('create'); 
}) */

//app.get('/posts/new', newPostController)

app.post('/posts/store', authMiddleware, storePostController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController) 
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

// Hides new user login if user is already logged in
global.loggedIn = null;

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()   
}); 


app.use((req, res) => res.render('notfound'));

app.listen(4000, ()=>{
  console.log("App listening on port 4000")
})

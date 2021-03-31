const mongoose = require('mongoose')

// Imports BlogPost model by specifying its relative path
const BlogPost = require('./models/BlogPost')

// Connects to database
mongoose.connect('mongodb://localhost/my_database', {useNewURLParser: true}); 

/*
BlogPost.create({
    title: 'The Mythbuster"s Guide to Saving Money on Energy Bills',
    body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills.  Energy-saving is one of my favorite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists.  You start spotting them everything at this time of year. They go like this: '
}, (error, blogpost) => {
    console.log(error, blogpost)
})
/*
BlogPost.find({}, (error, blogspot) =>{
    console.log(error, blogspot)
}
) */
/*
BlogPost.create({
    title: 'Testing Updated Code',
    body: 'After a lot of code changes, I am hoping this works'
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.find({}, (error, blogspot) =>{
    console.log(error, blogspot)
}) */
/*
* File contains the controller handling the request
* from the user to create a new blog post
*/
module.exports = (req, res) =>{
    if(req.session.userId) {
        return res.render("create"); 
    }
    res.redirect('/auth/login')
}
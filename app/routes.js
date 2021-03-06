module.exports=function(app, passport){
//Home Page
app.get('/', function(req, res) {
res.render('index.ejs');
});
//login
app.get('/login',function(req, res){
res.render('login.ejs',{ message: req.flash('loginMessage') });
});
   // process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	})); 
//signup
app.get('/signup', function(req, res) {
res.render('signup.ejs', { message: req.flash('signupMessage') });
});
	//process signup 
    app.post('/signup',passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));
//profile
app.get('/profile', isLoggedIn, function(req, res) {
res.render('profile.ejs', {
user : req.user
});
});
//LOGOUT
app.get('logout', function(req, res) {
req.logout();
res.redirect('/');
});
};
function isLoggedIn(req,res, next) {
if(req.isAuthenticated())
return next();
res.redirect('/');
}


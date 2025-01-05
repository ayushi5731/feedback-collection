// this is the passport module and not passport.js file
const passport =require('passport');

// route handler for login 
module.exports=(app)=>{
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}))

app.get("/api/logout",(req,res)=>{
    // it is a function that is automatically added by passport to req object
    req.logout();
    // thi slogout function takes the cookie that contains user id and kills that id

    res.send(req.user);
})
app.get("/api/current_user",(req,res)=>{
    // passport automattically attaches this user property to req object 
    res.send(req.user);
})
app.get('/auth/google/callback',passport.authenticate('google'));
};
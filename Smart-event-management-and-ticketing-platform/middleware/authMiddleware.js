exports.isAuthenticated = (req,res,next) =>{
    if (req.session.userID){
        return next();
    }
    res.redirect(`/auth/login`);
}

exports.isAdmin = (req,res,next) =>{
    if(req.session.role === `Admin`){
        return next();
    }
    res.status(403).send("Access Denied: Admin only");
}
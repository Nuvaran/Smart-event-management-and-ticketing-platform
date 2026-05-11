exports.isAuthenticated = (req,res,next) =>{
    if (req.session.userId){
        return next();
    }
    res.redirect(`/auth/login`);
}

exports.isAdmin = (req,res,next) =>{
    if(req.session.role === `Admin` || req.session.role ===`admin`){
        return next();
    }
    res.status(403).send("Access Denied: Admin only");
}
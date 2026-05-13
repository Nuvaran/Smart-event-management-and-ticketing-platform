const isAdmin = (req, res, next) => {
  try {
    // Ensure user exists from isAuth and that role is admin
    if (req.user && req.user.role === 'Admin'){
        next();
    }
    else{
        const error = new Error('Access denied. Admin rights required.');
        error.statusCode = 403;
        next(error);
    }
  } 
  catch (err) {
    err.statusCode = 500;
    err.message = "Authorization failed.";
    next(err);
  }
};

module.exports = isAdmin;
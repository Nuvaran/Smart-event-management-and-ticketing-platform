exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }

    return res.redirect('/auth/login');
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }

    return res.status(403).send('Access denied. Admins only.');
};
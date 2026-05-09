//centralised error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({
        success: false,
        status,
        message
    });
};

module.exports = errorHandler;

/* add in server.js
const errorHandler = require("./middleware/errorHandler");
// Central error handler must be AFTER routes
app.use(errorHandler);
*/
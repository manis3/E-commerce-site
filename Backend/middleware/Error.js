// const ErrorHandler = require('../utils/errorhandlers');

const ErrorHandler = require("../utils/errorhandlers");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    else if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.message = err.message

        ///////////////////////////handling wrong Mongoose Object ID Error///////////////////

        if (err.name === 'CastError') {
            const message = `Resource not found.Invalid ${err.path}`;
            error = new ErrorHandler(message, 400);

        }

        //////////////////////////////Handling the mongoose dublicate key error///////////////

        if (err.code === 11000) {
            const message = `Dublicate ${Object.keys(err.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }
        /////////////////////////////Handling mongoose Validation errors///////////////////
        if (err.name === "validationError") {
            const message = Object.values(err.errors).map((value) => value.message);
            error = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal Server Error",
        });

    }
}

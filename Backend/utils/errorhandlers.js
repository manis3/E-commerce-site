class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);


        //////////////captureStackTrace(obejct ,constructor)   is accepts an object and a constructor



    }
}
module.exports = ErrorHandler;
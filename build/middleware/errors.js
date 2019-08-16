"use strict";
var handleValidationError = function (err, req, res, next) {
    if (err && err.name === "ValidationError") {
        res.send({ "message": err.message });
    }
    else {
        next(err);
    }
};
var handleCastError = function (err, req, res, next) {
    if (err && err.name === "CastError") {
        res.send({ "message": "Object with such key not found" });
    }
    else {
        next(err);
    }
};
var handleOtherErrors = function (err, req, res, next) {
    res.send(err);
};
var asyncMiddleware = function (fn) { return function (req, res, next) {
    Promise.resolve(fn(req, res, next))
        .catch(next);
}; };
module.exports = {
    handleCastError: handleCastError,
    handleValidationError: handleValidationError,
    handleOtherErrors: handleOtherErrors,
    asyncMiddleware: asyncMiddleware
};

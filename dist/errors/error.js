"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuthErrors = exports.handleServerErrors = exports.handleCustomErrors = void 0;
const handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.handleCustomErrors = handleCustomErrors;
const handleServerErrors = (err, req, res) => {
    return res.status(500).send({ msg: "Internal Server Error" });
};
exports.handleServerErrors = handleServerErrors;
const handleAuthErrors = (err, req, res, next) => {
    if (err.errorInfo.code === "auth/email-already-exists") {
        return res.status(400).send({ msg: "Email already in use" });
    }
    else if (err.errorInfo.code === "auth/weak-password") {
        return res.status(400).send({ msg: "Weak password" });
    }
    else if (err.errorInfo.code === "auth/invalid-password") {
        return res.status(400).send({ msg: "Invalid password" });
    }
    else {
        next(err);
    }
};
exports.handleAuthErrors = handleAuthErrors;

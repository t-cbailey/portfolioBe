"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handleCustomErrors = void 0;
const handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        return res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.handleCustomErrors = handleCustomErrors;
const handleServerErrors = (err, req, res) => {
    console.log("in err");
    return res.status(500).send({ msg: "Internal Server Error" });
};
exports.handleServerErrors = handleServerErrors;

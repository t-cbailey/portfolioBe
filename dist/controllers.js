"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { findAllProjects, findProjectById, sendEmail } = require("./models");
const endpoints_json_1 = __importDefault(require("./endpoints.json"));
exports.getEndpoints = (req, res, next) => {
    res.status(200).send({ endpoints: endpoints_json_1.default });
};
exports.getAllProjects = (req, res, next) => {
    findAllProjects()
        .then((data) => {
        res.status(200).send({ data });
    })
        .catch(next);
};
exports.getProjectById = (req, res, next) => {
    const { project_id } = req.params;
    findProjectById(project_id)
        .then((data) => {
        res.status(200).send({ data });
    })
        .catch(next);
};
exports.sendContactFrom = (req, res, next) => {
    const { body } = req;
    sendEmail(body).then((data) => {
        res.status(202).send(data);
    });
};

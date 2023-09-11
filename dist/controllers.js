"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.postProject = exports.getUser = exports.getUsers = void 0;
const { findAllProjects, findProjectById, sendEmail, findAllUsers, getUserByID, postNewProject, deleteProjectById, } = require("./models");
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
    sendEmail(body)
        .then((data) => {
        res.status(202).send(data);
    })
        .catch(next);
};
const getUsers = (req, res, next) => {
    findAllUsers()
        .then((returnedUsers) => {
        res.status(200).send(returnedUsers);
    })
        .catch(next);
};
exports.getUsers = getUsers;
const getUser = (req, res, next) => {
    const { user_id } = req.params;
    getUserByID(user_id)
        .then((returnedUser) => {
        res.status(200).send(returnedUser);
    })
        .catch(next);
};
exports.getUser = getUser;
const postProject = (req, res, next) => {
    const { body } = req;
    postNewProject(body)
        .then((response) => {
        res.status(201).send(response);
    })
        .catch(next);
};
exports.postProject = postProject;
const deleteProject = (req, res, next) => {
    const { project_id } = req.params;
    deleteProjectById(project_id)
        .then((response) => {
        res.status(200).send(response);
    })
        .catch(next);
};
exports.deleteProject = deleteProject;

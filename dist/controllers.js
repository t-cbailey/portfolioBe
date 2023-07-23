// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });

const { findAllProjects, findProjectByName } = require("./models");
const { endpoints } = require("./endpoints.JSON");
exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
exports.getAllProjects = (req, res, next) => {
  findAllProjects().then();
};
exports.getProjectByName = (req, res, next) => {
  findProjectByName().then();
};

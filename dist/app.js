"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./errors/error");
const { getAllProjects, getProjectByName, getEndpoints, } = require("./controllers");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api", getEndpoints);
app.get("/api/projects", getAllProjects);
app.get("/api/projects/:name", getProjectByName);
app.all("*", (req, res) => res.status(404).send({ message: "Endpoint Not Found" }));
app.use(error_1.handleCustomErrors);
app.use(error_1.handleServerErrors);
exports.default = app;

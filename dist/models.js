"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./db/connection"));
exports.findAllProjects = () => {
    return connection_1.default
        .collection("projects")
        .get()
        .then((snapshot) => {
        if (!snapshot.empty) {
            return snapshot.docs.map((doc) => {
                const id = doc.id;
                const data = doc.data();
                return Object.assign({ id }, data);
            });
        }
        return [];
    });
};
exports.findProjectById = (project_id) => {
    return connection_1.default
        .collection("projects")
        .doc(project_id)
        .get()
        .then((snapshot) => {
        if (snapshot.exists) {
            return snapshot.data();
        }
        return Promise.reject({
            status: 404,
            msg: `No park found for project name: ${project_id}`,
        });
    });
};

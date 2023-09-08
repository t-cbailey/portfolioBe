"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.postNewProject = exports.getUserByID = void 0;
const connection_1 = __importDefault(require("./db/connection"));
const nodemailer = require("nodemailer");
const EmailAuth_json_1 = require("./EmailAuth.json");
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
            msg: `No project found for project name: ${project_id}`,
        });
    });
};
exports.sendEmail = (body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: EmailAuth_json_1.auth,
    });
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield transporter
                .sendMail({
                from: `${body.name} <${body.email}>`,
                to: "timbaileydev@gmail.com",
                subject: `${body.subject}`,
                text: `${body.messageBody}`,
            })
                .catch((err) => {
                return Promise.reject({ status: 500, msg: err });
            });
        });
    }
    return main()
        .then(() => {
        return "message sent";
    })
        .catch((err) => {
        return Promise.reject({ status: 500, msg: err });
    });
};
exports.findAllUsers = () => {
    return connection_1.default
        .collection("users")
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return Object.assign({ id }, data);
    }));
};
const getUserByID = (user_id) => {
    return connection_1.default
        .collection("users")
        .doc(user_id)
        .get()
        .then((snapshot) => {
        if (snapshot.exists) {
            const id = snapshot.id;
            const data = snapshot.data();
            return Object.assign({ id }, data);
        }
        return Promise.reject({
            status: 404,
            msg: `No user found for user_id: ${user_id}`,
        });
    });
};
exports.getUserByID = getUserByID;
const postNewProject = (project) => {
    const projectRef = connection_1.default.collection("projects");
    return projectRef.get().then((snapshot) => {
        let newDocId = snapshot.docs.length;
        snapshot.docs
            .map((doc) => {
            const regex = /[0-9]+/g;
            return doc.id.match(regex);
        })
            .flat()
            .find((id, i) => {
            if (id && +id !== i) {
                return (newDocId = i);
            }
        });
        const newProject = Object.assign({ id: `project_${newDocId}` }, project);
        return projectRef
            .doc(`project_${newDocId}`)
            .set(newProject)
            .then(() => {
            return "created successfully";
        })
            .catch((err) => {
            return Promise.reject({ status: 500, msg: err });
        });
    });
};
exports.postNewProject = postNewProject;
const deleteProjectById = (project_id) => {
    return connection_1.default
        .collection("projects")
        .doc(project_id)
        .delete()
        .then(() => {
        return `${project_id} deleted successfully`;
    })
        .catch((err) => {
        return Promise.reject({ status: 500, msg: err });
    });
};
exports.deleteProjectById = deleteProjectById;

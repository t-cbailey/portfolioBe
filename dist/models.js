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
const connection_1 = __importDefault(require("./db/connection"));
const nodemailer = require("nodemailer");
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
exports.sendEmail = (body) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "timbaileydevmailer@gmail.com",
            pass: "ywyjbdhpctijrcoc",
        },
    });
    console.log(body.name);
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            // send mail with defined transport object
            const info = yield transporter.sendMail({
                from: `${body.name} <${body.email}>`,
                to: "timbaileydev@gmail.com",
                subject: `${body.subject}`,
                text: `${body.messageBody}`, // plain text body
                // html: "<b>Hello world?</b>", // html body
            });
            console.log("Message sent: %s", info.messageId);
        });
    }
    return main()
        .then(() => {
        return "message sent";
    })
        .catch(console.error);
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const connection_1 = __importDefault(require("./connection"));
const admin = __importStar(require("firebase-admin"));
let projectData;
let usersData;
const auth = admin.auth();
if (process.env.NODE_ENV !== "production") {
    console.log("using test data");
    projectData = require("./data/projects-test.json");
    usersData = require("./data/users-test.json");
}
else {
    console.log("using production data");
    projectData = require("./data/projects-prod.json");
    usersData = require("./data/users-prod.json");
}
function deleteCollections() {
    return connection_1.default.listCollections().then((collections) => {
        const projDeletionPromises = collections.map((collection) => collection.get().then((querySnapshot) => {
            const batch = connection_1.default.batch();
            querySnapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            return batch.commit();
        }));
        return Promise.all(projDeletionPromises);
    });
}
function deleteAllUsers() {
    return auth.listUsers().then((listUsersResult) => {
        const userDeletionPromises = listUsersResult.users.map((userRecord) => {
            return auth.deleteUser(userRecord.uid);
        });
        return Promise.all(userDeletionPromises);
    });
}
function createProjects() {
    const projectCreationPromises = projectData.map((project, index) => {
        const pid = `project_${index}`;
        return connection_1.default.collection("projects").doc(pid).set(project);
    });
    return Promise.all(projectCreationPromises);
}
function createUsers() {
    const userCreationPromises = usersData.map((user, index) => {
        const uid = `user_${index + 1}`;
        return auth
            .createUser(Object.assign(Object.assign({}, user), { uid: uid }))
            .then((createdUser) => {
            const { password } = user, newUser = __rest(user, ["password"]);
            return connection_1.default.collection("users").doc(createdUser.uid).set(newUser);
        });
    });
    return Promise.all(userCreationPromises);
}
const seedDatabase = () => {
    return deleteCollections()
        .then(() => {
        return deleteAllUsers();
    })
        .then(() => {
        return createProjects();
    })
        .then(() => {
        return createUsers();
    })
        .then(() => console.log("Seed successful"))
        .catch((error) => console.error("Error seeding the database:", error));
};
exports.seedDatabase = seedDatabase;

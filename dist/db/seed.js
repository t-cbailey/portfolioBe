"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const connection_1 = __importDefault(require("./connection"));
let projectData;
if (process.env.NODE_ENV !== "production") {
    console.log("using test data");
    projectData = require("./data/test.json");
}
else {
    console.log("using production data");
    projectData = require("./data/prod.json");
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
function createProjects() {
    const parkCreationPromises = projectData.map((project, index) => {
        const pid = `project_${index + 1}`;
        return connection_1.default.collection("projects").doc(pid).set(project);
    });
    return Promise.all(parkCreationPromises);
}
const seedDatabase = () => {
    return deleteCollections()
        .then(() => {
        createProjects();
    })
        .then(() => console.log("Seed successful"))
        .catch((error) => console.error("Error seeding the database:", error));
};
exports.seedDatabase = seedDatabase;

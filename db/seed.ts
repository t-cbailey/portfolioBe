import db from "./connection";
import * as admin from "firebase-admin";

interface ProjectRequest {
  name: string;
  spiel: string;
  imageURL: string;
}

interface UserRequest {
  name: string;
  password: string;
}

let projectData: Array<ProjectRequest>;
let usersData: Array<UserRequest>;

if (process.env.NODE_ENV !== "production") {
  console.log("using test data");
  projectData = require("./data/projects-test.json");
  usersData = require("./data/users-test.json");
} else {
  console.log("using production data");
  projectData = require("./data/projects-prod.json");
  usersData = require("./data/users-test.json");
}

function deleteCollections(): Promise<FirebaseFirestore.WriteResult[][]> {
  return db.listCollections().then((collections) => {
    const projDeletionPromises = collections.map((collection) =>
      collection.get().then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
    );

    return Promise.all(projDeletionPromises);
  });
}

function createProjects(): Promise<FirebaseFirestore.WriteResult[]> {
  const projectCreationPromises = projectData.map((project, index) => {
    const pid = `project_${index + 1}`;
    return db.collection("projects").doc(pid).set(project);
  });

  return Promise.all(projectCreationPromises);
}
function createUsers(): Promise<FirebaseFirestore.WriteResult[]> {
  const userCreationPromises = usersData.map((user, index) => {
    const pid = `user_${index + 1}`;
    return db.collection("users").doc(pid).set(user);
  });

  return Promise.all(userCreationPromises);
}

export const seedDatabase = (): Promise<void> => {
  return deleteCollections()
    .then(() => {
      createProjects();
    })
    .then(() => {
      createUsers();
    })
    .then(() => console.log("Seed successful"))
    .catch((error) => console.error("Error seeding the database:", error));
};

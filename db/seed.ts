// import {
//   ParkRequest,
//   ReviewRequest,
//   UserRequest,
// } from "../../types/CustomTypes";
import db from "./connection";
import * as admin from "firebase-admin";

interface ProjectRequest {
  name: string;
  spiel: string;
  imageURL: string;
}

let projectData: Array<ProjectRequest> = require("./data/test.json");

// let parksData: Array<ParkRequest>;
// let usersData: Array<UserRequest>;
// let reviewsData: Array<ReviewRequest>;

// if (process.env.NODE_ENV !== "production") {
//   parksData = require("../data/test-data/parks.json");
//   usersData = require("../data/test-data/users.json");
//   reviewsData = require("../data/test-data/reviews.json");
// } else {
//   parksData = require("../data/test-data/production-data/parks-production.json");
//   usersData = require("../data/test-data/production-data/users-production.json");
//   reviewsData = require("../data/test-data/production-data/reviews-production.json");
// }

const auth = admin.auth();

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
  const parkCreationPromises = projectData.map((project, index) => {
    const pid = `project_${index + 1}`;
    return db.collection("project").doc(pid).set(project);
  });
  return Promise.all(parkCreationPromises);
}

export const seedDatabase = (): Promise<void> => {
  return deleteCollections()
    .then(() => {
      createProjects();
    })
    .then(() => console.log("Seed successful"))
    .catch((error) => console.error("Error seeding the database:", error));
};

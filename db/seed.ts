import db from "./connection";
import * as admin from "firebase-admin";

interface ProjectRequest {
  name: string;
  spiel: string;
  imageURL: string;
}

let projectData: Array<ProjectRequest>;

if (process.env.NODE_ENV !== "production") {
  console.log("in test");
  projectData = require("./data/test.json");
} else {
  console.log("in production");
  projectData = require("./data/prod.json");
}

function deleteCollections(): Promise<FirebaseFirestore.WriteResult[][]> {
  return db.listCollections().then((collections) => {
    console.log("got collections list");
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
    return db.collection("projects").doc(pid).set(project);
  });

  return Promise.all(parkCreationPromises);
}

export const seedDatabase = (): Promise<void> => {
  return deleteCollections()
    .then(() => {
      console.log("delete successful");
      createProjects();
    })
    .then(() => console.log("Seed successful"))
    .catch((error) => console.error("Error seeding the database:", error));
};

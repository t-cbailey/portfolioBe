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

const auth = admin.auth();

if (process.env.NODE_ENV !== "production") {
  console.log("using test data");
  projectData = require("./data/projects-test.json");
  usersData = require("./data/users-test.json");
} else {
  console.log("using production data");
  projectData = require("./data/projects-prod.json");
  usersData = require("./data/users-prod.json");
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

function deleteAllUsers(): Promise<void[]> {
  return auth.listUsers().then((listUsersResult) => {
    const userDeletionPromises = listUsersResult.users.map((userRecord) => {
      return auth.deleteUser(userRecord.uid);
    });
    return Promise.all(userDeletionPromises);
  });
}

function createProjects(): Promise<FirebaseFirestore.WriteResult[]> {
  const projectCreationPromises = projectData.map((project, index) => {
    const pid = `project_${index}`;
    return db.collection("projects").doc(pid).set(project);
  });

  return Promise.all(projectCreationPromises);
}
function createUsers(): Promise<FirebaseFirestore.WriteResult[]> {
  const userCreationPromises = usersData.map((user, index) => {
    const uid = `user_${index + 1}`;
    return auth
      .createUser({
        ...user,
        uid: uid,
      })
      .then((createdUser) => {
        const { password, ...newUser } = user;
        return db.collection("users").doc(createdUser.uid).set(newUser);
      });
  });
  return Promise.all(userCreationPromises);
}

export const seedDatabase = (): Promise<void> => {
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

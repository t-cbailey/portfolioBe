import admin, { ServiceAccount, firestore } from "firebase-admin";
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

import serviceAccount from "../serviceAccount.json";

// if (process.env.NODE_ENV !== "production") {
//   process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
//   process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
// }

initializeApp({
  credential: cert(serviceAccount),
});

const db: firestore.Firestore = getFirestore();

export default db;

const docRef = db.collection("users").doc("alovelace");

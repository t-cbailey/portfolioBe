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

const serviceAccount = require("../serviceAccount.json");

if (process.env.NODE_ENV !== "production") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  console.log("using emulator");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db: firestore.Firestore = getFirestore();

export default db;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const { initializeApp, applicationDefault, cert, } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue, Filter, } = require("firebase-admin/firestore");
const serviceAccount_json_1 = __importDefault(require("../serviceAccount.json"));
if (process.env.NODE_ENV !== "production") {
    process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
    console.log("using emulator");
}
firebase_admin_1.default.initializeApp({
    credential: cert(serviceAccount_json_1.default),
});
const db = getFirestore();
exports.default = db;

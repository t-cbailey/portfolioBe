"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const seed_1 = require("../db/seed");
beforeEach(() => (0, seed_1.seedDatabase)());
afterAll(() => (0, seed_1.seedDatabase)());
describe("POST /api/contact", () => {
    test("POST /api/contact", () => {
        const data = {
            email: "example@hotmail.com",
            name: "tim bailey",
            messageBody: "test email",
            subject: "food is tasty",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/contact")
            .send(data)
            .expect(202)
            .then((res) => {
            expect(res.text).toBe("message sent");
        });
    });
});

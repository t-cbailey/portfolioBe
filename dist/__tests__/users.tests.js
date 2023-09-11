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
describe("Users tests", () => {
    describe("GET api/users/", () => {
        test("should return a 200 status", () => {
            return (0, supertest_1.default)(app_1.default).get("/api/users").expect(200);
        });
        test("should return an array of user objects", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/users")
                .expect(200)
                .then(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                body.forEach((user) => {
                    expect(typeof user.id).toBe("string");
                    expect(typeof user.email).toBe("string");
                });
            });
        });
    });
    describe("GET /api/users/:users_id", () => {
        test("GET /api/users/:users_id should return 200 status code", () => {
            return (0, supertest_1.default)(app_1.default).get("/api/users/user_1").expect(200);
        });
        test("GET /api/users/:user_id should return a user object", () => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/users/user_1")
                .expect(200)
                .then((response) => {
                const user = response.body;
                expect(typeof user.id).toBe("string");
                expect(typeof user.email).toBe("string");
            });
        });
    });
});

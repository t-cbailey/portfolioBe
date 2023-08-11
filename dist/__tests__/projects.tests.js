"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const seed_1 = require("../db/seed");
beforeEach(() => (0, seed_1.seedDatabase)());
describe("GET /api/ non-existent endpoint", () => {
    test("GET /api/nonsense should return 404 status code", () => {
        return (0, supertest_1.default)(app_1.default).get("/api/nonsense").expect(404);
    });
});
describe("GET /api/projects", () => {
    test("GET /api/projects", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/projects")
            .expect(200)
            .then((res) => {
            expect(res.body.data.length).toBe(2);
            res.body.data.forEach((project) => {
                expect(typeof project.name).toBe("string");
                expect(typeof project.imgURLwebm).toBe("string");
                expect(typeof project.imgURLmp4).toBe("string");
                expect(typeof project.description).toBe("string");
                expect(typeof project.githubBE).toBe("string");
                expect(typeof project.githubFE).toBe("string");
                expect(typeof project.livelink).toBe("string");
                expect(typeof project.stack).toBe("string");
            });
        });
    });
});
describe("GET /api/projects:project_id", () => {
    test("GET /api/projects", () => {
        return (0, supertest_1.default)(app_1.default)
            .get("/api/projects/project_1")
            .expect(200)
            .then((res) => {
            expect(typeof res.body.data.name).toBe("string");
            expect(typeof res.body.data.imgURLwebm).toBe("string");
            expect(typeof res.body.data.imgURLmp4).toBe("string");
            expect(typeof res.body.data.description).toBe("string");
            expect(typeof res.body.data.githubBE).toBe("string");
            expect(typeof res.body.data.githubFE).toBe("string");
            expect(typeof res.body.data.livelink).toBe("string");
            expect(typeof res.body.data.stack).toBe("string");
        });
    });
});
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

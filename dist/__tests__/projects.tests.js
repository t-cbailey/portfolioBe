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
describe("POST /api/projects", () => {
    test("POST /api/projects", () => {
        const input = {
            name: "Test1",
            imgURLmp4: "TEST.mp4",
            imgURLwebm: "ncgames.webm",
            description: "TEST description",
            githubFE: "testlink",
            githubBE: "testlink",
            livelink: "testlink",
            stack: "React, JavaScript, CSS, Jest, Supertest, NODE.js, PostgreSQL",
        };
        return (0, supertest_1.default)(app_1.default)
            .post("/api/projects")
            .send(input)
            .expect(201)
            .then((res) => {
            expect(res.text).toBe("created successfully");
        })
            .then(() => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/projects")
                .expect(200)
                .then((res) => {
                expect(res.body.data.length).toBe(3);
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
});
describe("DELETE /api/projects/:project_id", () => {
    test("should remove correct project", () => {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/projects/project_1")
            .expect(200)
            .then((res) => {
            expect(res.text).toBe("project_1 deleted successfully");
        })
            .then(() => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/projects")
                .expect(200)
                .then((res) => {
                expect(res.body.data.length).toBe(1);
            });
        })
            .then(() => {
            return (0, supertest_1.default)(app_1.default)
                .get("/api/projects/project_1")
                .expect(404)
                .then((res) => {
                expect(res.body).toEqual({
                    msg: "No project found for project name: project_1",
                });
            });
        });
    });
});

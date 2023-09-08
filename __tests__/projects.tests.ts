import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed";
import { ProjectRes, Project } from "../types/CustomTypes";

beforeEach(() => seedDatabase());
afterAll(() => seedDatabase());

describe("GET /api/ non-existent endpoint", () => {
  test("GET /api/nonsense should return 404 status code", () => {
    return request(app).get("/api/nonsense").expect(404);
  });
});

describe("GET /api/projects", () => {
  test("GET /api/projects", () => {
    return request(app)
      .get("/api/projects")
      .expect(200)
      .then((res) => {
        expect(res.body.data.length).toBe(2);

        res.body.data.forEach((project: ProjectRes) => {
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
    return request(app)
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
    const input: Project = {
      name: "Test1",
      imgURLmp4: "TEST.mp4",
      imgURLwebm: "ncgames.webm",
      description: "TEST description",
      githubFE: "testlink",
      githubBE: "testlink",
      livelink: "testlink",
      stack: "React, JavaScript, CSS, Jest, Supertest, NODE.js, PostgreSQL",
    };
    return request(app)
      .post("/api/projects")
      .send(input)
      .expect(201)
      .then((res) => {
        expect(res.text).toBe("created successfully");
      })
      .then(() => {
        return request(app)
          .get("/api/projects")
          .expect(200)
          .then((res) => {
            expect(res.body.data.length).toBe(3);
            res.body.data.forEach((project: ProjectRes) => {
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
    return request(app)
      .delete("/api/projects/project_1")
      .expect(200)
      .then((res) => {
        expect(res.text).toBe("project_1 deleted successfully");
      })
      .then(() => {
        return request(app)
          .get("/api/projects")
          .expect(200)
          .then((res) => {
            expect(res.body.data.length).toBe(1);
          });
      })
      .then(() => {
        return request(app)
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

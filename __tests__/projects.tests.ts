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
          expect(typeof project.id).toBe("string");
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
        const project = res.body.data;
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
              expect(typeof project.id).toBe("string");
            });
          });
      });
  });
  test("should use the first unused number for the project id", () => {
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
      .delete("/api/projects/project_0")
      .expect(200)
      .then((res) => {
        expect(res.text).toBe("project_0 deleted successfully");
      })
      .then(() => {
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
                console.log(res.body.data);
                expect(res.body.data.length).toBe(2);
                const createdProject = res.body.data[0];
                expect(createdProject.name).toBe("Test1");
                expect(createdProject.id).toBe("project_0");
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

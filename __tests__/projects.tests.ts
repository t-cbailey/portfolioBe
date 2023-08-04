import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed";
import { ProjectRes } from "../types/CustomTypes";

beforeEach(() => seedDatabase());

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
          expect(typeof project.imgURL).toBe("string");
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
        expect(typeof res.body.data.imgURL).toBe("string");
        expect(typeof res.body.data.description).toBe("string");
        expect(typeof res.body.data.githubBE).toBe("string");
        expect(typeof res.body.data.githubFE).toBe("string");
        expect(typeof res.body.data.livelink).toBe("string");
        expect(typeof res.body.data.stack).toBe("string");
      });
  });
});

describe.only("POST /api/contact", () => {
  test("POST /api/contact", () => {
    const data = {
      email: "example@hotmail.com",
      name: "tim bailey",
      messageBody: "test email",
      subject: "food is tasty",
    };
    return request(app)
      .post("/api/contact")
      .send(data)
      .expect(202)
      .then((res) => {
        expect(res.text).toBe("message sent");
      });
  });
});

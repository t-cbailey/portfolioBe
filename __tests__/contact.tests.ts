import request from "supertest";
import app from "../app";
import { seedDatabase } from "../db/seed";

beforeEach(() => seedDatabase());
afterAll(() => seedDatabase());

describe("POST /api/contact", () => {
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

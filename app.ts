import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleCustomErrors, handleServerErrors } from "./errors/error";
const {
  getAllProjects,
  getProjectByName,
  getEndpoints,
} = require("./controllers");

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/projects", getAllProjects);
app.get("/api/projects/:name", getProjectByName);

app.all("*", (req: Request, res: Response) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handleServerErrors);

export default app;

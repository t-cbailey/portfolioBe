import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleCustomErrors, handleServerErrors } from "./errors/error";
import { getUser } from "./controllers";
const {
  getAllProjects,
  getProjectById,
  getEndpoints,
  sendContactFrom,
  getUsers,
  postProject,
  deleteProject,
} = require("./controllers");

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);
app.get("/api/projects", getAllProjects);
app.get("/api/projects/:project_id", getProjectById);
app.post("/api/contact", sendContactFrom);
app.get("/api/users/", getUsers);
app.get("/api/users/:user_id", getUser);
app.post("/api/projects", postProject);
app.delete("/api/projects/:project_id", deleteProject);

app.all("*", (req: Request, res: Response) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handleServerErrors);

export default app;

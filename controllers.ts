const { findAllProjects, findProjectById } = require("./models");
import { NextFunction, Request, RequestHandler, Response } from "express";
import endpoints from "./endpoints.json";

exports.getEndpoints = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ endpoints });
};

exports.getAllProjects = (req: Request, res: Response, next: NextFunction) => {
  findAllProjects().then((data: any) => {
    res.status(200).send({ data });
  });
};

exports.getProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params;
  findProjectById(project_id).then((data: any) => {
    res.status(200).send({ data });
  });
};

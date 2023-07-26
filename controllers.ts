const { findAllProjects, findProjectById, sendEmail } = require("./models");
import { NextFunction, Request, RequestHandler, Response } from "express";
import endpoints from "./endpoints.json";

exports.getEndpoints = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ endpoints });
};

exports.getAllProjects = (req: Request, res: Response, next: NextFunction) => {
  findAllProjects()
    .then((data: any) => {
      console.log("in controller");
      res.status(200).send({ data });
    })
    .catch(next);
};

exports.getProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params;
  findProjectById(project_id)
    .then((data: any) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

exports.sendContactFrom = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  sendEmail(body).then((data: any) => {
    res.status(202).send(data);
  });
};

const {
  findAllProjects,
  findProjectById,
  sendEmail,
  findAllUsers,
  getUserByID,
} = require("./models");
import { NextFunction, Request, RequestHandler, Response } from "express";
import endpoints from "./endpoints.json";
import { Project, ProjectRes, User } from "./types/CustomTypes";

exports.getEndpoints = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ endpoints });
};

exports.getAllProjects = (req: Request, res: Response, next: NextFunction) => {
  findAllProjects()
    .then((data: ProjectRes[]) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

exports.getProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params;
  findProjectById(project_id)
    .then((data: Project) => {
      res.status(200).send({ data });
    })
    .catch(next);
};

exports.sendContactFrom = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  sendEmail(body)
    .then((data: string) => {
      res.status(202).send(data);
    })
    .catch(next);
};

export const getUsers: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  findAllUsers()
    .then((returnedUsers: User[]) => {
      res.status(200).send(returnedUsers);
    })
    .catch(next);
};

export const getUser: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  getUserByID(user_id)
    .then((returnedUser: User) => {
      res.status(200).send(returnedUser);
    })
    .catch(next);
};

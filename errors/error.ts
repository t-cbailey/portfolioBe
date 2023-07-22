import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AuthError, CustomError } from "../types/CustomTypes";

export const handleCustomErrors: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

export const handleServerErrors: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  return res.status(500).send({ msg: "Internal Server Error" });
};

export const handleAuthErrors: ErrorRequestHandler = (
  err: AuthError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.errorInfo.code === "auth/email-already-exists") {
    return res.status(400).send({ msg: "Email already in use" });
  } else if (err.errorInfo.code === "auth/weak-password") {
    return res.status(400).send({ msg: "Weak password" });
  } else if (err.errorInfo.code === "auth/invalid-password") {
    return res.status(400).send({ msg: "Invalid password" });
  } else {
    next(err);
  }
};

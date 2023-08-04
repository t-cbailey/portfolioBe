import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../types/CustomTypes";

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
  console.log("in err");
  return res.status(500).send({ msg: "Internal Server Error" });
};

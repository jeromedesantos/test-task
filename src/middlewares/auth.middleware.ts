import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/error";

export const auth: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;
  if (token === null) {
    throw new AppError("You must Login to access!", 401);
  }
  const decoded = verifyToken(token);
  (req as any).user = decoded as any;
  next();
};

export const nonAuth: RequestHandler = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    throw new AppError("You're already logged in!", 400);
  }
  next();
};

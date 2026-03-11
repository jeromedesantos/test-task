import type { RequestHandler } from "express";
import { AppError } from "../utils/error";

export const notFound: RequestHandler = (req, res, next) => {
  try {
    throw new AppError("Route Not Found!", 404);
  } catch (err) {
    next(err);
  }
};

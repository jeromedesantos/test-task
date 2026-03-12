import { ZodError, ZodSchema } from "zod";
import { RequestHandler } from "express";
import { AppError } from "../utils/error";

export const validate =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = err.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        }));
        return next(new AppError(JSON.stringify(errors), 400));
      }
      next(err);
    }
  };

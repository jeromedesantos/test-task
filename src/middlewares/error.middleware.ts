import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.name || "Error",
    message: err.message || "Internal Server Error!",
  });
  console.log("ERROR HANDLER:", err);
};

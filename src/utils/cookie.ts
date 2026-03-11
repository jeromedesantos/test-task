import "dotenv/config";
import type { CookieOptions } from "express";
import { signToken } from "./jwt";
import { UserProps } from "../types";

export const token = (user: UserProps) =>
  signToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

export const cookie: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  path: "/",
};

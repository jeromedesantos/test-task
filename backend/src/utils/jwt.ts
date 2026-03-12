import jwt from "jsonwebtoken";
import type { User } from "../types";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as any;

export const signToken = (payload: User) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as User;

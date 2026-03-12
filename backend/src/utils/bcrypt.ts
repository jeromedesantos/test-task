import { hash, compare } from "bcrypt";

export const hashPassword = async (password: string) =>
  await hash(password, 10);

export const comparePassword = async (password: string, hash: string) =>
  await compare(password, hash);

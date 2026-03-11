import type { RequestHandler } from "express";
import { prisma } from "../connections/prisma";
import { AppError } from "../utils/error";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { cookie, token } from "../utils/cookie";

export const loginUsers: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser === null) {
      throw new AppError("Invalid email", 401);
    }
    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );
    if (existingUser && isPasswordValid === false) {
      throw new AppError("Invalid password", 401);
    }
    const { password: _, ...user } = existingUser;
    res.cookie("token", token, cookie).status(200).json({
      status: "Success",
      message: "Login success!",
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const logoutUsers: RequestHandler = (req, res, next) => {
  res.clearCookie("token", cookie).status(200).json({
    status: "Success",
    message: "Logout successful!",
  });
};

export const registerUsers: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new AppError("User already exists", 400);
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.cookie("token", token, cookie).status(200).json({
      status: "Success",
      message: "Register success!",
      data: user,
    });
  } catch (err: any) {
    next(err);
  }
};

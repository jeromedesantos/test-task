import type { RequestHandler } from "express";
import { prisma } from "../connections/prisma";
import { AppError } from "../utils/error";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { cookie, token } from "../utils/cookie";
import { registerSchema, updateUserSchema } from "../schemas/users.schema";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      status: "Success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (user === null) {
      throw new AppError("User not found", 404);
    }
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserInfo: RequestHandler = (req, res, next) => {
  const user = (req as any).user;
  res.status(200).json({
    status: "Success",
    data: user,
  });
};

export const loginUser: RequestHandler = async (req, res, next) => {
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
    res.cookie("token", token(user), cookie).status(200).json({
      status: "Success",
      message: "Login success!",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser: RequestHandler = (req, res, next) => {
  res.clearCookie("token", cookie).status(200).json({
    status: "Success",
    message: "Logout successful!",
  });
};

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
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
    res.cookie("token", token(user), cookie).status(200).json({
      status: "Success",
      message: "Register success!",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const { name, email } = updateUserSchema.parse(req.body);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return next(new AppError("User not found", 404));
    }
    next(err);
  }
};
export const updateUser: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { name, email } = updateUserSchema.parse(req.body);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return next(new AppError("User not found", 404));
    }
    next(err);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return next(new AppError("User not found", 404));
    }
    next(err);
  }
};

export const getTasksByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id as string;
    const tasks = await prisma.task.findMany({
      where: { userId },
    });
    res.status(200).json({
      status: "Success",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

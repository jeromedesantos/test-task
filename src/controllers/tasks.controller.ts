import type { RequestHandler } from "express";
import { prisma } from "../connections/prisma";
import { AppError } from "../utils/error";
import { createTaskSchema, updateTaskSchema } from "../utils/zod";

export const createTask: RequestHandler = async (req: any, res, next) => {
  try {
    const { title, description } = createTaskSchema.parse(req.body);
    const userId = req.user.id;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Task created",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json({
      status: "Success",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyTasks: RequestHandler = async (req: any, res, next) => {
  try {
    const userId = req.user.id;
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

export const getTaskById: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (task === null) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json({
      status: "Success",
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTask: RequestHandler = async (req: any, res, next) => {
  try {
    const id = req.params.id as string;
    const userId = req.user.id;
    const { title, description, status } = updateTaskSchema.parse(req.body);
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (task === null) {
      throw new AppError("Task not found", 404);
    }
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Task updated",
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask: RequestHandler = async (req: any, res, next) => {
  try {
    const id = req.params.id as string;
    const userId = req.user.id;
    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (task === null) {
      throw new AppError("Task not found", 404);
    }
    await prisma.task.delete({
      where: { id },
    });
    res.status(200).json({
      status: "Success",
      message: "Task deleted",
    });
  } catch (err) {
    next(err);
  }
};

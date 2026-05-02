import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import TaskService from "../services/task.service";
import { errorResponse } from "../utils/response.utils";

const taskService = new TaskService();

export const add = async (req: Request, res: Response) => {
  try {
    const result = await taskService.add(req.body, req.user);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const result = await taskService.update(req.params.id, req.body, req.user);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.delete(req.params.id, req.user);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const result = await taskService.get(req.params.id);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const result = await taskService.getAll(req.query);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

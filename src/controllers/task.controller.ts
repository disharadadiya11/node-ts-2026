import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { CustomRequest } from "../types/express";
import TaskService from "../services/task.service";
import { errorResponse } from "../utils/response.utils";

const taskService = new TaskService();

export const add = async (req: CustomRequest, res: Response) => {
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

export const update = async (req: CustomRequest, res: Response) => {
  try {
    const result = await taskService.update(req.params.id as string, req.body, req.user);
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

export const deleteTask = async (req: CustomRequest, res: Response) => {
  try {
    const result = await taskService.delete(req.params.id as string, req.user);
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

export const get = async (req: CustomRequest, res: Response) => {
  try {
    const result = await taskService.get(req.params.id as string);
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

export const getAll = async (req: CustomRequest, res: Response) => {
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

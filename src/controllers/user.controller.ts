import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import { errorResponse } from "../utils/response.utils";

const userService = new UserService();

export const register = async (req: Request, res: Response) => {
  try {
    const result = await userService.register(req.body, req.files);
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
    const result = await userService.update(
      req.params.id as string,
      req.body,
      req.files,
      req.user,
    );
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

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.login(req.body);
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.delete(req.params.id as string, req.user);
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
    const result = await userService.get(req.params.id as string);
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
    const result = await userService.getAll(req.query);
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

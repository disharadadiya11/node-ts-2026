import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { errorResponse } from "../utils/response.utils";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(StatusCodes.BAD_REQUEST).json(
        errorResponse(StatusCodes.BAD_REQUEST, true, errors.join(", "))
      );
    }
    
    next();
  };
};

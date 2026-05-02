import { Request, Response, NextFunction } from "express";
import { USER } from "../constants/message";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.utils";
import { errorResponse } from "../utils/response.utils";
import { protectedRoutes, ProtectedRoute } from "../routes/protected.routes";
import { match } from "path-to-regexp";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(StatusCodes.UNAUTHORIZED, false, USER.PLEASE_LOGIN),
        );
    }

    const { _id } = await verifyToken(token);
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(StatusCodes.UNAUTHORIZED, false, USER.PLEASE_REGISTER),
        );
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          (error as Error).message,
        ),
      );
  }
};

export const applyAuthenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const matchRoute = protectedRoutes.find((route: ProtectedRoute) => {
      const isMatch = match(route.path);
      return isMatch(req.path) && route.methods.includes(req.method);
    });

    if (matchRoute) {
      await authenticate(req, res, async () => {
        if (matchRoute.roles && !matchRoute.roles.includes(req.user?.role)) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(errorResponse(StatusCodes.FORBIDDEN, true, USER.NOT_ALLOWED));
        }
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          (error as Error).message,
        ),
      );
  }
};

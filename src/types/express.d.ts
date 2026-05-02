import { Request } from "express";

export interface CustomRequest extends Request {
  user?: any;
  files?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
      files?: any;
    }
  }
}

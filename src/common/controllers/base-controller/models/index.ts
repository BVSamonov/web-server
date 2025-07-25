import { Router, Request, Response, NextFunction } from "express";
import { IMiddleware } from "../../middleware/models/index";

export interface IControllerRoute {
  path: string;
  method: keyof Pick<Router, "get" | "delete" | "patch" | "post" | "put">;
  func: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}

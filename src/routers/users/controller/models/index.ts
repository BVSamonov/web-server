import { Response, Request, NextFunction } from "express";
import { HTTPError } from "../../../../common/errors/http-error/index.js";

export interface IUsersController {
  HTTPError: HTTPError;
  all: (req: Request, res: Response, next: NextFunction) => void;
  person: (req: Request, res: Response, next: NextFunction) => void;
  error: (req: Request, res: Response, next: NextFunction) => void;
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}

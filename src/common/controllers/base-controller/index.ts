import { Router, Response } from "express";
import { IControllerRoute } from "./models/index.js";
import "reflect-metadata";
import { ILogger } from "../../../logger/models/index.js";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this.logger = logger;
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  send = <T>(res: Response, code: number, message: T) => {
    res.type("application/json");
    return res.status(code).json(message);
  };

  ok = <T>(res: Response, message: T) => {
    return this.send(res, 200, message);
  };

  protected bindRouters = (routers: IControllerRoute[]) => {
    for (const route of routers) {
      const { path, method, func, middlewares } = route;
      const middleware = middlewares?.map((value) => value.execute.bind(value));
      const handler = func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;

      this.logger.log(`[${method}] ${path}`);
      this._router[method](path, pipeline);
    }
  };
}

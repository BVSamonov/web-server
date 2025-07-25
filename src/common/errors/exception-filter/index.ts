import { NextFunction, Request, Response } from "express";
import { IExceptionFilter } from "./models/index.js";
import { LoggerService } from "../../../logger/index.js";
import { HTTPError } from "../http-error/index.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types.js";
import { ILogger } from "../../../logger/models/index.js";
import "reflect-metadata";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.logger = logger;
  }

  catch = (
    error: Error | HTTPError,
    req: Request,
    res: Response,
    nextFunc: NextFunction,
  ) => {
    if (error instanceof HTTPError) {
      const { context, message, statusCode } = error;

      this.logger.error(`[${context}] Error: ${statusCode} - ${message}`);
      res.status(statusCode).send({ message });
    } else {
      this.logger.error(`Error: 500 - ${error.message}`);
      res.status(500).send({ message: error.message });
    }
  };
}

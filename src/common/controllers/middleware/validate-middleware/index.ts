import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "../models/index.js";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute = async ({ body }: Request, res: Response, next: NextFunction) => {
    const instance = plainToClass(this.classToValidate, body);
    const data = await validate(instance);

    if (data.length > 0) {
      res.status(422).send(data);
    } else {
      next();
    }
  };
}

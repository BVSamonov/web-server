import { Logger } from "tslog";
import { ILogger } from "./models/index.js";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFunctionName: false,
      displayFilePath: "hidden",
    });
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}

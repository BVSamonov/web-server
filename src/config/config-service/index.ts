import { config, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { IConfigService } from "../models";
import { ILogger } from "../../logger/models";
import { TYPES } from "../../types.js";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    const { parsed } = config();

    if (parsed) {
      this.config = parsed;
      this.loggerService.log("[ConfigService] - Конфигурация .env загружена");
    } else {
      this.loggerService.error(
        "[ConfigService] - Не удалось прочитать файл .env или он отсутствует",
      );
    }
  }

  get = (key: string): string => {
    return this.config[key];
  };
}

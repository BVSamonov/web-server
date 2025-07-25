import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import { LoggerService } from "../../logger/index.js";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: LoggerService) {
    this.client = new PrismaClient();
    this.logger = logger;
  }

  connect = async () => {
    try {
      await this.client.$connect();
      this.logger.log(
        "[PrismaService] - Соединение с базой данных установлено",
      );
    } catch (error) {
      this.logger.error(
        `[PrismaService] - Ошибка при соединении с базой
          ${error}
        `,
      );
    }
  };

  disconnect = async () => {
    try {
      await this.client.$disconnect();
      this.logger.log("[PrismaService] - Соединение с базой данных разорвано");
    } catch (error) {
      this.logger.error(
        `[PrismaService] - Ошибка при разъединении с базой
          ${error}
        `,
      );
    }
  };
}

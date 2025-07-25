import { UserLogin } from "../dto/user-login/index.js";
import { UserRegister } from "../dto/user-register/index.js";
import { User } from "../entity/user-entity.js";
import { ICheckedUser, IUserService } from "./models/index.js";
import { TYPES } from "../../../types.js";
import { inject } from "inversify";
import { IConfigService } from "../../../config/models/index.js";
import { UserModel } from "@prisma/client";
import { IUserRepository } from "../repository/models/index.js";

export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
  ) {}

  createUser = async ({
    email,
    name,
    password,
  }: UserRegister): Promise<UserModel | null> => {
    const user = await this.userRepository.find(email);

    if (user) {
      return null;
    }

    const salt = this.configService.get("SALT");
    const newUser = new User(name, email);
    console.log(salt);

    await newUser.setPassword(password, Number(salt));

    return this.userRepository.create(newUser);
  };

  validateUser = async ({
    email,
    password,
  }: UserLogin): Promise<ICheckedUser> => {
    const user = await this.userRepository.find(email);

    if (!user) {
      return { status: false };
    }

    const checkedUser = new User(user.name, user.email, user.password);
    const status = await checkedUser.compare(password);

    return { status, name: user.name };
  };

  updateUserToken = async (
    email: string,
    refreshToken: string,
  ): Promise<ICheckedUser> => {
    const updatedUser = await this.userRepository.update(refreshToken, email);

    if (!updatedUser) {
      return { status: false };
    }

    return { status: true };
  };
}

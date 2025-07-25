import { IsEmail, IsString } from "class-validator";

export class UserLogin {
  @IsEmail({}, { message: "Не корректный Email" })
  email: string;
  @IsString({ message: "Введите пароль" })
  password: string;
}

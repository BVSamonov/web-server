import { IsEmail, IsString } from "class-validator";

export class UserRegister {
  @IsString({ message: "Введите ваше имя" })
  name: string;

  @IsString({ message: "Введите пароль" })
  password: string;

  @IsEmail({}, { message: "Не корректный Email" })
  email: string;
}

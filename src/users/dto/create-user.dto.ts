import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class CreateUserDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  username: string;

  firstname: string;
  lastname: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.firstname + " " + obj.lastname;
  })
  fullname?: string;

  @IsNotEmpty()
  @Expose()
  password: string;

  @IsBoolean()
  status: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

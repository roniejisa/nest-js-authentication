import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsString } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class UserDto extends BaseDto {
  @Expose()
  @IsString()
  fullname: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  status: boolean;
}

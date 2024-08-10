import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

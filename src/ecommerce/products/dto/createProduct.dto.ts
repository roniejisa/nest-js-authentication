import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsNumber({
    allowInfinity: false,
  })
  price: number;
}

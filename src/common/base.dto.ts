import { Expose, plainToClass } from "class-transformer";

export class BaseDto {
  @Expose()
  id?: never;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;

  static plainToInstance<T>(this: new (...args: any[]) => T, obj: T): T {
    return plainToClass(this, obj, {
      excludeExtraneousValues: true,
    });
  }
}

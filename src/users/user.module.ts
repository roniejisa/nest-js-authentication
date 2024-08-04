/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DatabaseModule } from "src/database/database.module";
import { StoreModule } from "src/store/store.module";
import { LogModule } from "src/log/log.module";
import { SecurityService } from "./security.service";

@Module({
  imports: [
    DatabaseModule,
    StoreModule.forFeature({ filename: "user.json" }),
    LogModule,
  ],
  controllers: [UserController],
  providers: [UserService, SecurityService],
  exports: [UserService],
})
export class UserModule {}

/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";
import { DatabaseModule } from "./database/database.module";
import { StoreModule } from "./store/store.module";
import { SocketModule } from "./socket/socket.module";
import { EcommerceModule } from "./ecommerce/ecommerce.module";

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    StoreModule.forRoot(),
    SocketModule,
    EcommerceModule,
  ],
})
export class AppModule {}

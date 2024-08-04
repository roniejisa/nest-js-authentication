import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient as MongoPrismaClient } from "prisma/generated/mongodb";
import { PrismaClient as PostgresPrismaClient } from "prisma/generated/portgres";
@Injectable()
export class DatabaseService implements OnModuleInit {
  mongoClient: MongoPrismaClient;
  postgresClient: PostgresPrismaClient;
  constructor() {
    this.mongoClient = new MongoPrismaClient();
    this.postgresClient = new PostgresPrismaClient();
  }
  async onModuleInit() {
    await this.mongoClient.$connect();
    await this.postgresClient.$connect();
  }
}

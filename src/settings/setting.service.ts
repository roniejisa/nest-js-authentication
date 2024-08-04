/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class SettingService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const settings =
      await this.databaseService.postgresClient.setting.findMany();
    return settings;
  }

  async findOne(key: string) {
    const setting = await this.databaseService.postgresClient.setting.findFirst(
      {
        where: {
          key,
        },
      },
    );
    return setting;
  }

  async create(data: any) {
    const setting = await this.databaseService.postgresClient.user.create({
      data,
    });
    return setting;
  }
}

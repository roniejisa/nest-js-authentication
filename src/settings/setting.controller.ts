/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { SettingService } from "./setting.service";

@Controller("settings")
export class SettingController {
  constructor(private readonly settingService: SettingService) {}
  @Get()
  findAll() {
    return this.settingService.findAll();
  }

  @Get(":key")
  find(@Param("key") key: string) {
    return key;
  }

  @Post()
  create(@Body() settingData: { key: string; value: string }) {
    return this.settingService.create(settingData);
  }

  @Patch()
  update(@Body() settingData: object) {
    return settingData;
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return id;
  }
}

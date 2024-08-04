/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { LogService } from "src/log/log.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private log: LogService,
  ) {}
  @Post(":123")
  async test(@Param("123") id: number) {
    return this.log.log();
  }

  @Get(":test")
  async test2(@Param("test") test: string) {
    return this.userService.log();
  }

  @Post()
  async create(@Body() createUserData: CreateUserDto) {
    createUserData.status = false;
    const user = await this.userService.create(createUserData);
    return user;
  }

  @Get()
  async findMany(@Query() query) {
    const user = await this.userService.findAll(query);
    return UserDto.plainToInstance(user);
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }
}

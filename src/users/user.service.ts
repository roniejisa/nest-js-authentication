/* eslint-disable prettier/prettier */
import { DatabaseService } from "src/database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { StoreService } from "src/store/store.service";
import { LogService } from "src/log/log.service";
import { SecurityService } from "./security.service";
interface filter {
  status?: boolean;
}
@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject("STORE_SERVICEuser.json")
    private readonly storeService: StoreService,
    private logService: LogService,
    @Inject(forwardRef(() => SecurityService))
    private securityService: SecurityService,
  ) {}
  async log() {
    return this.logService.log();
  }
  async create(user: CreateUserDto) {
    this.storeService.save(user);
    return await this.databaseService.postgresClient.user.create({
      data: user,
    });
    // try {
    //   return await this.databaseService.postgresClient.user.create({
    //     data: user,
    //   });
    // } catch (e) {
    //   console.log(e.message);
    //   return e;
    // }
  }

  async findAll(query): Promise<any> {
    const filters: filter = {};
    if (query.status) {
      filters.status = query.status === "true";
    }
    return this.databaseService.postgresClient.user.findMany({
      where: filters,
    });
  }

  async findOne(id: number) {
    return this.databaseService.postgresClient.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.databaseService.postgresClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.databaseService.postgresClient.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findBy(params: object) {
    return params;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/createProduct.dto";
import { plainToClass } from "class-transformer";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateProductDto) {
    const checkData = plainToClass(CreateProductDto, data, {
      excludeExtraneousValues: true,
    });
    return this.productService.create(checkData);
  }
}

import { Controller, Get } from "@nestjs/common";

@Controller("product-categories")
export class ProductCategoryController {
  @Get()
  findAll() {
    return {
      name: "product-categories",
    };
  }
}

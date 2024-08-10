import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductCategoryService {
  productCategories = [
    {
      id: 1,
      name: "Apple",
    },
    {
      id: 2,
      name: "Samsung",
    },
  ];
}

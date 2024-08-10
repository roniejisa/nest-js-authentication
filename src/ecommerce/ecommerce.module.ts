import { Module } from "@nestjs/common";
import { OrderController } from "./orders/order.controller";
import { ProductService } from "./products/product.service";
import { OrderService } from "./orders/order.service";
import { ProductCategoryService } from "./product_categories/productCategories.service";
import { ProductController } from "./products/product.controller";
import { ProductCategoryController } from "./product_categories/productCategory.controller";

@Module({
  controllers: [OrderController, ProductController, ProductCategoryController],
  providers: [ProductService, OrderService, ProductCategoryService],
})
export class EcommerceModule {}

import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      name: "Iphone 15",
      product_category_id: 1,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(data: number) {
    return this.products.find(({ id }) => +id === +data);
  }

  create(dataProduct: any) {
    const lastProduct = this.products.sort((a, b) => b.id - a.id);
    const productId = +lastProduct[0].id + 1;
    dataProduct.id = +lastProduct[0].id + 1;
    console.log(this.products);
    this.products.push({ ...dataProduct });
    return this.findOne(productId);
  }
}

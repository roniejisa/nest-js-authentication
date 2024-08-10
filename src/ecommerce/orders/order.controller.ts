import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/createOrder.dto";

@Controller("orders")
export class OrderController {
  @Post()
  create(@Body() data: CreateOrderDto) {
    console.log(data);
  }
}

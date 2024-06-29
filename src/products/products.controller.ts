import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateBilledProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('addBillProduct')
  createBilledProduct(@Body() dto: CreateBilledProductDto) {
    return this.productsService.createBilledProduct(dto);
  }
}

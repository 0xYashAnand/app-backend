import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateBilledProductDto } from './dto';
import { Products } from 'libs/mongoose';

@Injectable()
export class ProductsService {
  async createBilledProduct(dto: CreateBilledProductDto) {
    try {
      const {
        productName,
        productPrice,
        productQuantity,
        productTotal,
        productAmountPaid,
        billId,
        productByStaff,
        productStaffId,
      } = dto;
      const product = new Products({
        productName,
        productPrice,
        productQuantity,
        productTotal,
        productAmountPaid,
        billId,
        productByStaff,
        productStaffId,
      });
      await product.save();
      return {
        message: 'Product added successfully',
        data: product,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to fetch Bills with that ID.');
    }
  }
}

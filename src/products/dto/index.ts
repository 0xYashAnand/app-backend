import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBilledProductDto {
  @IsString()
  productName: string;

  @IsNumber()
  productPrice: number;

  @IsNumber()
  productQuantity: number;

  @IsNumber()
  productTotal: number;

  @IsNumber()
  @IsOptional()
  productAmountPaid: number;

  @IsString()
  billId: string;

  @IsString()
  @IsOptional()
  productByStaff: string;

  @IsString()
  @IsOptional()
  productStaffId: string;
}

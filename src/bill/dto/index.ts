import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEmail, ValidateNested, ArrayNotEmpty, IsArray, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

class CustomerDetailsDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerAddress: string;

  @IsNotEmpty()
  @IsString()
  customerMobile: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;
}

class BillProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  productQuantity: number;

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productTotal: number;
}

class BillServiceDto {
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @IsNotEmpty()
  @IsNumber()
  servicePrice: number;

  @IsNotEmpty()
  @IsNumber()
  serviceTotal: number;
}

export class GenerateBillDto {
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @IsOptional()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CustomerDetailsDto)
  customerDetails: CustomerDetailsDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillProductDto)
  billProducts?: BillProductDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillServiceDto)
  billServices?: BillServiceDto[];

  @ValidateIf((o) => !o.billProducts || !o.billServices)
  @ArrayNotEmpty({ each: true, message: 'At least one of billProducts or billServices must be provided' })
  placeholder: any; // This is just a placeholder to enforce the validation rule

  @IsNumber()
  billTotal: number;

  @IsNotEmpty()
  @IsString()
  billedBy: string;

  @IsNotEmpty()
  @IsString()
  paymentMode: string;

  @IsNotEmpty()
  @IsString()
  paidByCash: string;

  @IsNotEmpty()
  @IsString()
  paidByOnline: string;

  @IsNotEmpty()
  @IsString()
  paymentStatus: string;

  @IsNotEmpty()
  @IsString()
  billType: string;
}

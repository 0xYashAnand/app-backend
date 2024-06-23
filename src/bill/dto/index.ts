import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class CreateBillDto {
    @IsNotEmpty()
    @IsString()
    companyId: string;
  
    // @IsNotEmpty()
    // @IsString()
    // billNo: string;
  
    @IsNotEmpty()
    @IsString()
    customerId: string;
  
    // @IsNotEmpty()
    @IsOptional()
    @IsObject()
    billProducts: {
      [key: string]: {
        productName: string;
        productQuantity: number;
        productPrice: number;
        productTotal: number;
        productRecommendedBy: string;
      };
    };
  
    // @IsNotEmpty()
    @IsOptional()
    @IsObject()
    billServices: {
      [key: number]: {
        serviceName: string;
        servicePrice: number;
        serviceTotal: number;
        serviceBy: string;
      };
    };
  
    @IsNotEmpty()
    @IsString()
    billTotal: string;
  
    // @IsNotEmpty()
    // @IsString()
    // billedBy: string;
  
    // @IsNotEmpty()
    // @IsString()
    // paymentMode: string;
  
    // @IsNotEmpty()
    // @IsString()
    // paidByCash: string;
  
    // @IsNotEmpty()
    // @IsString()
    // paidByOnline: string;
  
    // @IsNotEmpty()
    // @IsString()
    // paymentStatus: string;
  
    // @IsNotEmpty()
    // @IsString()
    // billType: string;
  }
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class CreateBilledServiceDto {
  @IsString()
  serviceName: string;

  @IsNumber()
  servicePrice: number;

  @IsNumber()
  serviceTotal: number;

  @IsNumber()
  @IsOptional()
  serviceAmountPaid: number;

  @IsString()
  @IsNotEmpty()
  billId: string;

  @IsString()
  @IsOptional()
  serviceByStaff: string;

  @IsString()
  @IsOptional()
  serviceStaffId: string;
}

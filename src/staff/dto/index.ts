import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  userId: string;

  @IsString()
  staffName: string;

  @IsString()
  bankDetailId: string;

  @IsString()
  staffStatus: string;
}

export class StaffBillServicesDto {
  @IsString()
  @IsNotEmpty()
  staffId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  serviceId: string[];
}

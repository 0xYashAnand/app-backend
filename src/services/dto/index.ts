import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto{
    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @IsNotEmpty()
    @IsString()
    servicePrice: string;

    @IsNotEmpty()
    @IsString()
    billId: string;
}
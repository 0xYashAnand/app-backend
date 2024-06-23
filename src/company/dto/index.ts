import { IsEmail, IsMobilePhone, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto{

    @IsString()
    companyName: string;

    @IsString()
    companyAddress: string;

    @IsString()
    companyCity: string;
    
    @IsString()
    companyPincode: string;

    @IsString()
    companyState: string;
    
    @IsOptional()
    @IsString()
    companyCountry: string;

    @IsMobilePhone()
    companyContact: string;

    @IsEmail()
    companyEmail: string;
}
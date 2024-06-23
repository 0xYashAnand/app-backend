import { Injectable } from '@nestjs/common';
import { CompanyDetails } from 'libs/mongoose';
import { CreateCompanyDto } from './dto';

@Injectable()
export class CompanyService {

  async createCompany(dto: CreateCompanyDto) {
    try {
      const data = new CompanyDetails(dto);
      await data.save();      
      return {
        message: 'Company created successfully',
        data: data,
      };
    } catch (err) {
       console.error('error in creating company:', err);
       throw err;
    }     
  }

}

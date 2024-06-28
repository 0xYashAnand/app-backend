import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CompanyDetails } from 'libs/mongoose';
import { CreateCompanyDto } from './dto';
import mongoose from 'mongoose';

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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to create Company');
    }
  }

  async getCompanyDetails(companyId: string) {
    try {
      const data = await CompanyDetails.findById({
        _id: new mongoose.Types.ObjectId(companyId),
      }).lean();
      if (!data) {
        throw new BadRequestException('Company not found');
      }
      return {
        message: 'Company details fetched successfully',
        data: data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException(
        'Unable to fetch Company details with that ID.',
      );
    }
  }

  async updateCompanyDetails(companyId: string, dto: CreateCompanyDto) {
    try {
      const data = await CompanyDetails.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(companyId) },
        dto,
      );
      if (!data) {
        throw new BadRequestException('Company not found');
      }
      return {
        message: 'Company details updated successfully',
        data: dto,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException(
        'Unable to update Company details with that ID.',
      );
    }
  }
}

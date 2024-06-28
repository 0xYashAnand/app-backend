import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CreateCompanyDto } from './dto/index';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('createCompany')
  createCompany(@Body() dto: CreateCompanyDto) {
    return this.companyService.createCompany(dto);
  }

  @Get(':cid')
  getCompanyDetails(@Param('cid') companyId: string) {
    return this.companyService.getCompanyDetails(companyId);
  }

  @Patch(':cid/updateCompany')
  updateCompanyDetails(
    @Param('cid') companyId: string,
    @Body() dto: CreateCompanyDto,
  ) {
    return this.companyService.updateCompanyDetails(companyId, dto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

import { CreateCompanyDto } from './dto/index';

@Controller('')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Post('createCompany')
    createCompany(
        @Body() dto: CreateCompanyDto
    ) {
        return this.companyService.createCompany(dto);
    }

}

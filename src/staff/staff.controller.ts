import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffBillServicesDto, CreateStaffDto } from './dto';

@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post('create')
  createStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.createStaff(createStaffDto);
  }

  @Post('addstaffbillService')
  createStaffBillService(@Body() billServiceDto: StaffBillServicesDto) {
    return this.staffService.createStaffBillService(billServiceDto);
  }

  @Get('getstaffTodayServices/:id')
  getStaffTodayServices(@Param('id') staffId: string) {
    return this.staffService.getStaffTodayServices(staffId);
  }

  @Get(':id/services/total')
  async getStaffServiceTotalOfParticularDay(
    @Param('staffId') staffId: string,
    @Query('date') date: string,
  ) {
    return await this.staffService.getStaffServiceTotalOfParticularDay(
      staffId,
      date,
    );
  }
}

import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { GenerateBillDto } from './dto';

import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Post('generatebill')
  generateBill(@Body() dto: GenerateBillDto) {
    return this.billService.generateBill(dto);
  }

  @Get('todaybills')
  getTodayBills() {
    return this.billService.getTodayBills();
  }

  @Get(':id')
  getBillById(@Param('id') billId: string) {
    return this.billService.getBillById(billId);
  }

  // Create a new bill and hide the old bill
  @Patch(':id')
  updateBill(@Param('id') id: string) {
    return 'Bill updated';
  }

  // Hide from view
  @Post(':id/delete')
  deleteBill(@Param('id') id: string) {
    return 'Bill deleted';
  }
}

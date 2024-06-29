import { Body, Controller, Post } from '@nestjs/common';
import { CreateBilledServiceDto } from './dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Post('create')
  createBilledService(@Body() createServiceDto: CreateBilledServiceDto) {
    return this.servicesService.createBilledService(createServiceDto);
  }
}

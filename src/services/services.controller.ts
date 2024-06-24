import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceDto } from './dto';
import { ServicesService } from './services.service';


@Controller('services')
export class ServicesController {
    constructor(private servicesService: ServicesService) {}

    @Post('create')
    createService(
        @Body() createServiceDto: CreateServiceDto,
    ) {
        return this.servicesService.createService(createServiceDto);
    }
}

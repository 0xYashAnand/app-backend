import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto';
import { Services } from 'libs/mongoose';

@Injectable()
export class ServicesService {
  async createService(dto: CreateServiceDto) {
    try {
     const data = new Services(dto);
     await data.save();

    return {
        message: 'Service created successfully',
        data: dto
    };
    } catch (error) {
        console.log(error);
        return {
        message: 'Error creating service',
        error
        }
      }
  }
}

import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateBilledServiceDto } from './dto';
import { Services } from 'libs/mongoose';

@Injectable()
export class ServicesService {
  async createBilledService(dto: CreateBilledServiceDto) {
    try {
      const data = new Services(dto);
      await data.save();

      return {
        message: 'Service created successfully',
        data: dto,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to fetch Bills with that ID.');
    }
  }
}

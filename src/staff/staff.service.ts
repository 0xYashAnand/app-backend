import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { StaffBillServicesDto, CreateStaffDto } from './dto';
import { StaffDetails, StaffBillServices, Services } from 'libs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class StaffService {
  async createStaff(dto: CreateStaffDto) {
    try {
      const data = new StaffDetails(dto);
      const savedData = await data.save();

      const newData = await StaffDetails.findById(savedData._id).lean();

      return {
        message: 'Staff created successfully',
        data: newData,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to create Staff.');
    }
  }

  async createStaffBillService(dto: StaffBillServicesDto) {
    try {
      const billService = new StaffBillServices(dto);
      await billService.save();
      const staff = await StaffDetails.findById(
        new mongoose.Types.ObjectId(dto.staffId),
      ).lean();

      return {
        message: 'Staff created successfully',
        data: staff,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to fetch Bills with that ID.');
    }
  }

  async getStaffTodayServices(staffId: string) {
    try {
      const staff = await StaffDetails.findById(
        new mongoose.Types.ObjectId(staffId),
      ).lean();

      if (!staff) {
        throw new BadRequestException('Staff not found');
      }

      const today = new Date();

      const startOfDay = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate(),
          0,
          0,
          0,
          0,
        ),
      );

      const endOfDay = new Date(
        Date.UTC(
          today.getUTCFullYear(),
          today.getUTCMonth(),
          today.getUTCDate(),
          23,
          59,
          59,
          999,
        ),
      );

      console.log(
        'Fetching bills between:',
        startOfDay.toISOString(),
        'and',
        endOfDay.toISOString(),
      );

      const services = await StaffBillServices.find({
        staffId: staffId,
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).lean();

      return services;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to fetch Staff services.');
    }
  }

  async getStaffServiceTotalOfParticularDay(staffId: string, date: string) {
    try {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(startDate.getDate() + 1);

      const services = await Services.find({
        serviceStaffId: new mongoose.Types.ObjectId(staffId),
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const totalServiceAmount = services.reduce((total, service) => {
        return total + service.serviceTotal;
      }, 0);

      return {
        message: 'Total service amount fetched successfully',
        totalAmount: totalServiceAmount,
        services,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error.getResponse();
      }
      throw new BadRequestException('Unable to fetch Staff with that ID.');
    }
  }
}

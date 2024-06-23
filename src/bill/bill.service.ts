import { Injectable,  } from '@nestjs/common';

import { 
CreateBillDto 
} from './dto';

import {
 Bills,
 CompanyDetails,
 CustomerDetails
} 
from 'libs/mongoose';
import mongoose from 'mongoose';


@Injectable()
export class BillService {

    async createBill(dto : CreateBillDto) {
        try {
            const data = new Bills(dto);

            const company = await CompanyDetails.findOne(
              new mongoose.Types.ObjectId(dto.companyId)
            );

            const customerDetails = await CustomerDetails.findOne(
              new mongoose.Types.ObjectId(dto.customerId)
            );

            if (!company) {
              throw new Error('Company not found');
            }

            if (!customerDetails) {
              throw new Error('Customer not found');
            }

            await data.save();

            const response = {
              companyId: data.companyId,
              billNo: data.billNo,
              customerId: data.customerId,
              billTotal: data.billTotal,
              message: data.message,
              companyDetails: {
                companyName: company.companyName,
                companyAddress: company.companyAddress,
                companyCity: company.companyCity,
                companyState: company.companyState,
                companyCountry: company.companyCountry,
                companyPincode: company.companyPincode || null,
                companyContact: company.companyContact,
                companyEmail: company.companyEmail
              },
              customerDetails: {
                customerName: customerDetails.customerName,
                customerAddress: customerDetails.customerAddress,
                customerCity: customerDetails.customerCity,
                customerState: customerDetails.customerState,
                customerCountry: customerDetails.customerCountry,
                customerPincode: customerDetails.customerPincode || null,
                customerContact: customerDetails.customerContact,
                customerEmail: customerDetails.customerEmail
              },
          }

            return {
                message: 'Bill created successfully',
                data: response,
            };
          } catch (err) {
            console.error('error in creating bill:', err);
            throw err;
          }
    }
}
  




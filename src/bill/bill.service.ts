import { Injectable } from '@nestjs/common';
import { GenerateBillDto } from './dto';
import {
  Bills,
  CustomerBills,
  CompanyDetails,
  CustomerDetails,
  Services,
  Products,
} from 'libs/mongoose';

@Injectable()
export class BillService {
  async generateBill(dto: GenerateBillDto) {
    try {
      const {
        companyId,
        customerDetails,
        billProducts,
        billServices,
        billTotal,
        billedBy,
        paymentMode,
        paidByCash,
        paidByOnline,
        paymentStatus,
        billType,
      } = dto;

      // Check if the company exists
      const company = await CompanyDetails.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      // Find or create customer
      let customer = await CustomerDetails.findOne({
        $or: [
          { customerMobile: customerDetails.customerMobile },
          { customerEmail: customerDetails.customerEmail },
        ],
      });

      // Create a new customer if not found
      if (!customer) {
        customer = new CustomerDetails({
          customerName: customerDetails.customerName,
          customerAddress: customerDetails.customerAddress,
          customerMobile: customerDetails.customerMobile,
          customerEmail: customerDetails.customerEmail,
        });
        await customer.save();
      }

      // Initialize arrays to store service and product IDs
      const serviceIds = [];
      const productIds = [];
      const savedBillServices = [];
      const savedBillProducts = [];

      // Save services and store their IDs
      if (billServices && billServices.length > 0) {
        for (const service of billServices) {
          const newService = new Services({ ...service, billId: null });
          const savedService = await newService.save();
          serviceIds.push(savedService._id);
          savedBillServices.push(savedService);
        }
      }

      // Save products and store their IDs
      if (billProducts && billProducts.length > 0) {
        for (const product of billProducts) {
          const newProduct = new Products({ ...product, billId: null });
          const savedProduct = await newProduct.save();
          productIds.push(savedProduct._id);
          savedBillProducts.push(savedProduct);
        }
      }

      // Create a new invoice
      const newInvoice = new Bills({
        companyId,
        customerId: customer._id,
        services: serviceIds,
        products: productIds,
        billServices: savedBillServices,
        billProducts: savedBillProducts,
        totalAmount: billTotal,
        billedBy,
        paymentMode,
        paidByCash,
        paidByOnline,
        paymentStatus,
        billType,
      });

      await newInvoice.save();

      // Update each service with the invoice ID
      for (const service of savedBillServices) {
        service.billId = newInvoice._id;
        await service.save();
      }

      // Update each product with the invoice ID
      for (const product of savedBillProducts) {
        product.billId = newInvoice._id;
        await product.save();
      }

      // Find or create an entry in CustomerBills
      let customerBill = await CustomerBills.findOne({
        customerId: customer._id,
      });

      if (!customerBill) {
        customerBill = new CustomerBills({
          customerName: customer.customerName,
          customerId: customer._id,
          billIds: [newInvoice._id],
        });
      } else {
        customerBill.billIds.push(newInvoice._id);
        customerBill.updatedAt = Date.now();
      }

      await customerBill.save();

      // Re-fetch the updated bill services and products to include in the response
      const updatedBillServices = await Services.find({ _id: { $in: serviceIds } });
      const updatedBillProducts = await Products.find({ _id: { $in: productIds } });

      return {
        message: 'Bill created successfully',
        data: {
          ...newInvoice.toObject(),
          billServices: updatedBillServices,
          billProducts: updatedBillProducts,
        },
      };
    } catch (err) {
      console.error('Error in creating bill:', err);
      throw err;
    }
  }
}

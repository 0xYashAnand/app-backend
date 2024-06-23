// imports
const mongoose = require('mongoose');
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.DATABASE_URL)
  

// Schemas
const billSchema = new mongoose.Schema({
  companyId: { 
    type: String 
  },
  // billNo: { 
  //   type: String 
  // },
  customerId: { 
    type: String 
  },
  billTotal: { 
    type: Number 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});
const serviceSchema = new mongoose.Schema();
const productSchema = new mongoose.Schema();
const customerSchema = new mongoose.Schema({
  customerName: { 
    type: String,
    required: true,
  },
  customerMobile: { 
    type: String,
    required: true,
    unique: true
  },
  customerEmail: { 
    type: String,
    required: true,
    unique: true
  },
  customerAddress: { 
    type: String 
  },
  customerBirthdate: {
    type: Date
  },
  customerAnniversary: {
    type: Date
  },
  customerCity: { 
    type: String
  },
  customerState: { 
    type: String 
  },
  customerCountry: { 
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
const customerBillSchema = new mongoose.Schema({
  billNo: { 
    type: String 
  },
  customerId: { 
    type: String 
  },
  billProducts: { 
    type: Object 
  },
  billServices: { 
    type: Object 
  },
  billTotal: { 
    type: Number 
  },
  billedBy: { 
    type: String 
  },
  paymentMode: { 
    type: String 
  },
  paidByCash: { 
    type: String 
  },
  paidByOnline: { 
    type: String 
  },
  paymentStatus: { 
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});
const userSchema = new mongoose.Schema();
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyAddress: { 
    type: String , 
    required: true
  },
  companyCity: { 
    type: String , 
    required: true
  },  
  companyPincode: { 
    type: String , 
    required: true
  },
  companyState: { 
    type: String  , 
    required: true
  },
  companyCountry: { 
    type: String 
  },
  companyContact: { 
    type: String , 
    required: true , 
    unique: true
  },
  companyEmail: { 
    type: String , 
    required: true , 
    unique: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
});


// Models
export const Bills = mongoose.model(
  'Bills',
   billSchema,
  'bills'
);
export const Services = mongoose.model(
  'Services',
  serviceSchema,
  'services',
);
export const Products = mongoose.model(
  'Products',
   productSchema,
  'products',
);
export const CustomerDetails = mongoose.model(
  'CustomerDetails',
   customerSchema,
  'customerDetails',
);
export const CustomerBill = mongoose.model(
  'CustomerBill',
  customerBillSchema,
  'customerBill',
);
export const User = mongoose.model(
  'User',
  userSchema,
  'user',
);
export const CompanyDetails = mongoose.model(
  'companyDetails',
  companySchema,
  'companyDetails',
);

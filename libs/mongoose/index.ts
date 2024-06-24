const mongoose = require('mongoose');
import * as dotenv from 'dotenv';



dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

// Schemas
const billSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyDetails',
    required: true,
  },
  billNo: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerDetails',
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceDetails',
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductDetails',
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  billProducts: [
    {
      type: Object,
    }
  ],
  billServices: [
    {
      type: Object,
    }
  ],
  billTotal: {
    type: Number,
  },
  billedBy: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  paidByCash: {
    type: String,
  },
  paidByOnline: {
    type: String,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  billType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: true,
  },
  serviceTotal: {
    type: Number,
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bills',
  },
  serviceBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productTotal: {
    type: Number,
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bills',
  },
  productRecommendedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerMobile: {
    type: String,
    required: true,
    unique: true,
  },
  customerEmail: {
    type: String,
    unique: true,
  },
  customerAddress: {
    type: String,
  },
  customerBirthdate: {
    type: Date,
  },
  customerAnniversary: {
    type: Date,
  },
  customerCity: {
    type: String,
  },
  customerState: {
    type: String,
  },
  customerCountry: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const customerBillSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerDetails',
    required: true,
  },
  billIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bills',
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  companyCity: {
    type: String,
    required: true,
  },
  companyPincode: {
    type: String,
    required: true,
  },
  companyState: {
    type: String,
    required: true,
  },
  companyCountry: {
    type: String,
  },
  companyContact: {
    type: String,
    required: true,
    unique: true,
  },
  companyEmail: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Models
export const Bills = mongoose.model('Bills', billSchema, 'bills');

export const Services = mongoose.model('Services', serviceSchema, 'services');

export const Products = mongoose.model('Products', productSchema, 'products');

export const CustomerDetails = mongoose.model('CustomerDetails', customerSchema, 'customerDetails');

export const CustomerBills = mongoose.model('CustomerBills', customerBillSchema, 'customerBills');

export const CompanyDetails = mongoose.model('CompanyDetails', companySchema, 'companyDetails');

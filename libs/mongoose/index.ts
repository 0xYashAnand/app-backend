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
  serviceAmountPaid: {
    type: Number,
    default : 0,
  },
  serviceByStaff: {
    type: String,
    required: true,
  },
  sericeStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffDetails',
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
  productAmountPaid: {
    type: Number,
    default : 0,
  },
  productByStaff: {
    type: String,
    required: true,
  },
  productStaffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffDetails',
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
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyDetails',
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

// userSchema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userMobile: {
    type: String,
    required: true,
    unique: true,
  },
  // staff or admin or superadmin
  userRole: {
    type: String,
    required: true,
    default: 'staff',
  },
  userStatus: {
    type: String,
    required: true,
  },
  userCreatedAt: {
    type: Date,
    default: Date.now,
  },
  userUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

// staffSchema
const staffSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  bankDetailId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankDetails',
    required: true,
  },
  staffStatus: {
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
  deletedAt: {
    type: Date,
  },

})

// staffBillServicesSchema
const staffBillServicesSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffDetails',
    required: true,
  },
  serviceId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Services',
      required: true,
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
})

//staffBillProductsSchema
const staffBillProductsSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StaffDetails',
    required: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true,
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
})

//bankSchema
const bankSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  bankIFSC: {
    type: String,
    required: true,
  },
  bankAccount: {
    type: Number,
    required: true,
  },
  bankAccountHolderName: {
    type: String,
    required: true,
  },
  bankAccountType: {
    type: String,
    required: true,
  },
  bankStatus: {
    type: String,
    required: true,
  },
  bankCreatedAt: {
    type: Date,
    default: Date.now,
  },
  bankUpdatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Models
export const Bills = mongoose.model('Bills', billSchema, 'bills');

export const Services = mongoose.model('Services', serviceSchema, 'services');

export const Products = mongoose.model('Products', productSchema, 'products');

export const CustomerDetails = mongoose.model('CustomerDetails', customerSchema, 'customerDetails');

export const CustomerBills = mongoose.model('CustomerBills', customerBillSchema, 'customerBills');

export const CompanyDetails = mongoose.model('CompanyDetails', companySchema, 'companyDetails');

export const UserDetails = mongoose.model('UserDetails', userSchema, 'userDetails');

export const StaffDetails = mongoose.model('StaffDetails', staffSchema, 'staffDetails');

export const BankDetails = mongoose.model('BankDetails', bankSchema, 'bankDetails');

export const StaffBillServices = mongoose.model('StaffBillServices', staffBillServicesSchema, 'staffBillServices');

export const StaffBillProducts = mongoose.model('StaffBillProducts', staffBillProductsSchema, 'staffBillProducts');

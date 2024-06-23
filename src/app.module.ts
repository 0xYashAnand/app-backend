// Standard Packages
import { Module } from '@nestjs/common';

// Custom Packages
import { BillModule } from './bill/bill.module';
import { CompanyModule } from './company/company.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';


@Module({
    imports: [
     BillModule,
     CompanyModule,
     ProductsModule,
     ServicesModule,
    ],
    controllers: [],
    providers: [],
  })
export class AppModule {}

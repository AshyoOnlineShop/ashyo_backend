import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { AboutShopModule } from './about_shop/about_shop.module';
import { AboutShop } from './about_shop/models/about_shop.model';
import { BranchesModule } from './branches/branches.module';
import { Branch } from './branches/models/branch.model';
import { CustomerLocationModule } from './customer_location/customer_location.module';
import { CustomerLocation } from './customer_location/models/customer_location.model';
import { Customer } from './customer/models/customer.model';
import { CustomerModule } from './customer/customer.module';
import { ProductBranchesModule } from './product_branches/product_branches.module';
import { ProductBranch } from './product_branches/models/product_branch.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.model';
import { Stuff } from './stuff/models/stuff.model';
import { StuffModule } from './stuff/stuff.module';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/model/attribute.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        District,
        Region,
        AboutShop,
        Branch,
        CustomerLocation,
        ProductBranch,
        Customer,
        Category,
        Attribute,
        Category,
        Stuff,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    DistrictModule,
    RegionModule,
    AboutShopModule,
    BranchesModule,
    CustomerLocationModule,
    CustomerModule,
    ProductBranchesModule,
    CategoryModule,
    StuffModule,
    AttributeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

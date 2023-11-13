import { ProductMedia } from './product_media/models/product_media.model';
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
import { DeliveryModule } from './delivery/delivery.module';
import { Delivery } from './delivery/models/delivery.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.model';
import { Stuff } from './stuff/models/stuff.model';
import { StuffModule } from './stuff/stuff.module';
import { AttributeModule } from './attribute/attribute.module';
import { Attribute } from './attribute/model/attribute.model';
import { AttributeGroupModule } from './attribute-group/attribute-group.module';
import { AttributeGroup } from './attribute-group/model/attribute-group.model';
import { ProductInfoModule } from './product-info/product-info.module';
import { ProductInfo } from './product-info/model/product-info.model';
import { BrandCategoryModule } from './brand-category/brand-category.module';
import { BrandCategory } from './brand-category/model/brand-category.model';
import { SaleProductsModule } from './sale-products/sale-products.module';
import { SaleProducts } from './sale-products/model/sale-product.model';
import { Product } from './products/models/product.model';
import { ProductModule } from './products/product.module';
import { ProductMediaModule } from './product_media/product_media.module';

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
        Customer,
        Delivery
        ProductBranch,
        Category,
        Stuff,
        Attribute,
        AttributeGroup,
        ProductInfo,
        BrandCategory,
        SaleProducts
        Product,
        ProductMedia,
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
    DeliveryModule,
    CategoryModule,
    StuffModule,
    AttributeModule,
    AttributeGroupModule,
    ProductInfoModule,
    BrandCategoryModule,
    SaleProductsModule
    ProductModule,
    ProductMediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

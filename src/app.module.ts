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
import { Card_types } from './card_types/models/card_types.model';
import { CustomerCard } from './customer_card/models/customer_card.model';
import { History } from './history/models/history.model';
import { Order } from './order/models/order.model';
import { Payment } from './payment/models/payment.model';
import { Card_typesModule } from './card_types/card_types.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { HistoryModule } from './history/history.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { Cart } from './cart/models/cart.model';
import { CartModule } from './cart/cart.module';
import { ProductModel } from './product_model/models/product_model.model';
import { ProductModelModule } from './product_model/product_model.module';
import { Brand } from './brands/models/brands.model';
import { BrandModule } from './brands/brands.module';
import { LikedProduct } from './liked_products/models/liked_product.model';
import { ViewedProduct } from './viewed_products/models/viewed_product.model';
import { Comment } from './comments/models/comment.model';
import { Rating } from './rating/models/rating.model';
import { CommentsModule } from './comments/comments.module';
import { RatingModule } from './rating/rating.module';
import { ViewedProductsModule } from './viewed_products/viewed_products.module';
import { LikedProductsModule } from './liked_products/liked_products.module';
import { AdminCustomer } from './admin_customer/models/admin_customer.model';
import { AdminCustomerModule } from './admin_customer/admin_customer.module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Commercial } from './commercial/models/commercial.model';
import { CommercialModule } from './commercial/commercial.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../', 'uploads'),
      serveRoot: '/api/uploads',
      exclude: ['/api/uploads/index.html'],
    }),
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
        Delivery,
        ProductBranch,
        Category,
        Stuff,
        Attribute,
        AttributeGroup,
        ProductInfo,
        BrandCategory,
        SaleProducts,
        Product,
        ProductMedia,
        Card_types,
        CustomerCard,
        History,
        Order,
        Payment,
        Cart,
        ProductModel,
        Brand,
        LikedProduct,
        ViewedProduct,
        Comment,
        Rating,
        AdminCustomer,
        Commercial,
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
    SaleProductsModule,
    ProductModule,
    ProductMediaModule,
    Card_typesModule,
    CustomerCardModule,
    HistoryModule,
    OrderModule,
    PaymentModule,
    CartModule,
    ProductModelModule,
    BrandModule,
    CommentsModule,
    RatingModule,
    ViewedProductsModule,
    LikedProductsModule,
    AdminCustomerModule,
    CommercialModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

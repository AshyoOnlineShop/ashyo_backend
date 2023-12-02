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
import { ImgModule } from './images/images.module';
import { Img } from './images/model/img.model';
import { MulterModule } from '@nestjs/platform-express';
import { v4 } from 'uuid';


const multer = require('multer');

// Configure the multer storage
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // Specify the destination directory where the images will be stored
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    // Specify the filename of the images
    // You can use the original name, or generate a random name with an extension
    callback(null, v4());
  }
});

// Configure the multer file filter
const fileFilter = (req, file, callback) => {
  // Accept only image files with .jpg, .jpeg, or .png extensions
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
import { MailModule } from './mail/mail.module';

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
        Img
      ],
      autoLoadModels: true,
      logging: false,
    }),
    MulterModule.register({
      dest: "./uploads",
      storage: storage,
      fileFilter: fileFilter
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
    ImgModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

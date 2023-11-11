import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistrictModule } from './district/district.module';
import { District } from './district/model/district.model';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { AboutShopModule } from './about_shop/about_shop.module';
import { AboutShop } from './about_shop/models/about_shop.model';
import { BranchesModule } from './branches/branches.module';
import { Branch } from './branches/models/branch.model';

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
      models: [District, Region, AboutShop, Branch],
      autoLoadModels: true,
      logging: false,
    }),
    DistrictModule,
    RegionModule,
    AboutShopModule,
    BranchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

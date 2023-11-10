import { Stuff } from './stuff/model/stuff.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistrictModule } from './district/district.module';
import { District } from './district/model/district.model';
import { StuffModule } from './stuff/stuff.module';

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
      models: [District, Stuff],
      autoLoadModels: true,
      logging: false,
    }),
    DistrictModule,
    StuffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

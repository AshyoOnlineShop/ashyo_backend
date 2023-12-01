import { Module } from '@nestjs/common';
import { CommercialService } from './commercial.service';
import { CommercialController } from './commercial.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Commercial } from './models/commercial.model';
import { FilesModule } from '../file_uploads/file_uploads.module';

@Module({
  imports: [SequelizeModule.forFeature([Commercial]), FilesModule],
  controllers: [CommercialController],
  providers: [CommercialService],
})
export class CommercialModule {}

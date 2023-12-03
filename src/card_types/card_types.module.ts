import { Module } from '@nestjs/common';
import { Card_typesService } from './card_types.service';
import { Card_typesController } from './card_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card_types } from './models/card_types.model';
import { FilesModule } from '../file_uploads/file_uploads.module';

@Module({
  imports: [SequelizeModule.forFeature([Card_types]), FilesModule],
  controllers: [Card_typesController],
  providers: [Card_typesService],
})
export class Card_typesModule {}

import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attribute } from './model/attribute.model';

@Module({
  imports: [SequelizeModule.forFeature([Attribute])],
  controllers: [AttributeController],
  providers: [AttributeService],
})
export class AttributeModule {}

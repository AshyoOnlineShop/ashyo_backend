import { Module } from '@nestjs/common';
import { AttributeGroupService } from './attribute-group.service';
import { AttributeGroupController } from './attribute-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttributeGroup } from './model/attribute-group.model';

@Module({
  imports: [SequelizeModule.forFeature([AttributeGroup])],
  controllers: [AttributeGroupController],
  providers: [AttributeGroupService],
})
export class AttributeGroupModule {}

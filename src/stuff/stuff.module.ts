import { Module } from '@nestjs/common';
import { Stuff } from './model/stuff.model';
import { StuffService } from './stuff.service';
import { StuffController } from './stuff.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Stuff])],
  controllers: [StuffController],
  providers: [StuffService],
})
export class StuffModule {}

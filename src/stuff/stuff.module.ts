import { Module } from '@nestjs/common';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stuff } from './models/stuff.model';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Stuff]),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [StuffController],
  providers: [StuffService, MailService],
})
export class StuffModule {}

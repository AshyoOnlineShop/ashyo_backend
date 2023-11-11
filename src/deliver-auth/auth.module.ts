import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DeliverMailModule } from '../mail-deliver/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DeliverMailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class DeliverAuthModule {}

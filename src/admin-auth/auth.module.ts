import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminMailModule } from '../mail-admin/mail.module';

@Module({
  imports: [AdminMailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
})
export class AdminAuthModule {}

import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Stuff } from '../stuff/models/stuff.model';

@Injectable()
export class DeliverGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Deliver unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Deliver unauthorized');
    }

    const stuff = await this.validateToken(token);
    if (!stuff || !stuff.is_active) {
      throw new UnauthorizedException('Invalid or inactive deliver');
    }

    if (stuff.role !== 'deliver') {
      throw new UnauthorizedException('Incorrect stuff!');
    }

    req.stuff = stuff;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<Stuff>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.DELIVER_ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}

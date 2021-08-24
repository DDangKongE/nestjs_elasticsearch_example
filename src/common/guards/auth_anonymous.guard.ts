import { Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardWithAnonymous extends NestAuthGuard('jwt') {
  handleRequest(err, user) {
    return user;
  }
}
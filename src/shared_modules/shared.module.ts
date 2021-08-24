import { Global, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from 'nestjs-throttler';
import { APP_ENV } from '../common/constants/app_env';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
          issuer: configService.get('JWT_ISSUER'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: 60,
        limit: configService.isEnv(APP_ENV.PROD) ? 120 : 3600,
      }),
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.resolve(
          process.env.NODE_ENV === undefined
            ? '.env'
            : `${process.env.NODE_ENV}.env`,
        ),
      ),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [JwtModule, ConfigService],
})
export class SharedModule {}

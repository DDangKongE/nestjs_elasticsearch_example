import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstans } from './constans';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports : [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret : jwtConstans.secret,
            signOptions : {expiresIn : '60000s'},
        })
    ],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy],
    exports : [AuthService],
})
export class AuthModule {}

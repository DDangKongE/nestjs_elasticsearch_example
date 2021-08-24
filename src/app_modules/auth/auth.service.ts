import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dto/user_login.dto';
import * as bcrypt from 'bcrypt';
import { GlobalException } from 'src/common/exceptions/global_exception';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService : UserService,
        private readonly jwtService : JwtService,
    ) {}

    async validateUser(body : UserLoginDto) : Promise<object>{
        const user = await this.userService.existUsername(body.username);
        
        
        if(!user){
            throw new GlobalException({
                statusCode : HttpStatus.NOT_FOUND,
                responseCode: Number(`${HttpStatus.NOT_FOUND}99`),
                msg : '존재하지 않는 유저 입니다.',
            })
        }
        // 이 부분이 언디파인드 떳던 건 UserEntity password가 select = false
        // existUsername 함수에서 select로 비밀번호 가져오는 것으로 해결

        
        // 비밀번호가 틀려도 토큰이 발급됐던 이유는 validateHash 비동기처리
        const isPasswordValid = await this.validateHash(
            body.password,
            user.password,
        );

        if (isPasswordValid){
            const { password, ...result } = user;
            return await this.login(result);
        } else { 
            throw new GlobalException({
                statusCode : HttpStatus.BAD_REQUEST,
                responseCode: Number(`${HttpStatus.BAD_REQUEST}99`),
                msg : '사용자 정보가 올바르지 않습니다.',
            })
        }
        // return null;
    }

    async login(user : any): Promise<any>{
        const payload = { id : user.id, username : user.username };
        return {
            access_token : await this.jwtService.signAsync(payload),
        };
    }

    async validateHash(password : string, hash : string ): Promise<Boolean> {
        // bcrypt 비동기처리 안됨  
        return await bcrypt.compare(password, hash || '');
    }
 }

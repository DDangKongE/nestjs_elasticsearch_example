import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/shared_modules/services/config.service";
import { UserService } from "../user/user.service";
import { jwtConstans } from "./constans";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : jwtConstans.secret,
        });
    }

    async validate(payload : any){
        return { id: payload.id, username : payload.username }
    }
}
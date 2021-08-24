import { Body, Post } from '@nestjs/common';
import { RouterTag } from 'src/common/decorators/router_swagger_tag.decorator';
import { SwaggerDecorators } from 'src/common/decorators/swagger.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@RouterTag('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SwaggerDecorators('회원 가입')
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.createUser(body);
  }
}

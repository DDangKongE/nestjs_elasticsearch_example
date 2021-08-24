import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly userRepository: UserRepository,
  ) {}

  //회원가입
  async createUser(body: CreateUserDto) {
    await this.userRepository.save(this.userRepository.create(body));
  }

  //로그인시 아이디 유무 확인
  async existUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username }, select: ['id', 'username', 'password'] });
  }

  async getLoginUser(id: number) {
    return await this.userRepository.findOne(id);
  }
}

// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findById(id: number): Promise<Users | undefined> {
    return this.userRepository.findOneBy({ id });
  }
}

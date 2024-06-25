import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.delete(id);
  }
}

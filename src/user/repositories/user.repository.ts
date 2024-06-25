import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}

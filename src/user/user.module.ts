import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { PismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PismaModule],
})
export class UserModule {}

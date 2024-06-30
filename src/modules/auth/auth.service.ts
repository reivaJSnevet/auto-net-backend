import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    if (user) {
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: '15m',
      });

      return { accessToken };
    }

    throw new UnauthorizedException();
  }

  async register(user: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
    return this.userService.createUser(user);
  }
}

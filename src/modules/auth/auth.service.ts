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

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return new UnauthorizedException('User not found');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async login(user: Partial<User>): Promise<{ accessToken: string }> {
    if (user) {
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException();
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
  }

  async register(user: CreateUserDto): Promise<User> {
    try {
      user.password = await this.hashPassword(user.password);
      return this.userService.createUser(user);
    } catch (error) {
      throw error;
    }
  }
}

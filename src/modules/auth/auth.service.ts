import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(
    user: Partial<User>,
    res: Response,
  ): Promise<{ message: string }> {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const accessMaxAge = 15 * 60 * 1000; // 15 minutes
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: accessMaxAge, // 15 minutes
    });

    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: refreshMaxAge,
    });

    return { message: 'Logged in successfully' };
  }

  async refresh(
    refreshToken: string,
    res: Response,
  ): Promise<{ message: string | never }> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.getUserById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }
      const newPayload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });

      const accessMaxAge = 15 * 60 * 1000; // 15 minutes
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: accessMaxAge,
      });

      return { message: 'Refreshed successfully' };
    } catch (e) {
      throw new Error('Invalid refresh token');
    }
  }

  async register(user: CreateUserDto): Promise<User> {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);
    return this.userService.createUser(user);
  }
}

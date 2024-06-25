import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Res() res: Response,
  ): Promise<{ message: string }> {
    return await this.authService.login(req.user, res);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }

  @Post('refresh')
  async refresh(
    @Body('refresh_token') refreshToken: string,
    @Res() res: Response,
  ): Promise<{ message: string }> {
    return this.authService.refresh(refreshToken, res);
  }
}

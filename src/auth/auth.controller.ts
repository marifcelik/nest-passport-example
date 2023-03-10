import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/users/users.service';
import { GoogleAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async handleLogin(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Get('login')
  getLoginPage() {
    return { msg: 'deneme' }
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handlGoogleLogin() { }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect() {
    return { msg: 'ok' }
  }

  @Get('status')
  getStatus(@Req() req: Request) {
    console.log(req.user);
    if (req.user)
      return { msg: 'authenticated' }
  }
}

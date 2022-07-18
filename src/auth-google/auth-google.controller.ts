import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto'

@Controller('auth/google')
export class AuthGoogleController {
  constructor(
    public authService: AuthService,
    public authGoogleService: AuthGoogleService,
  ) {}

  @Get('login')
  @HttpCode(HttpStatus.OK)
  async login(@Query() query: AuthGoogleLoginDto) {
    const socialData = await this.authGoogleService.getProfileByToken(query);

    return this.authService.validateSocialLogin(socialData);
  }
}

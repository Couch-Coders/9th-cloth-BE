import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from 'src/social/interfaces/soical.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.google = new OAuth2Client(
      configService.get('google.clientId'),
      configService.get('google.clientSecret'),
    );
  }

  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: [this.configService.get('google.clientId')],
    });

    const data = ticket.getPayload();
    const id = parseInt(data.sub);
    console.log(data);

    return {
      id: data.sub,
      email: data.email,
      username: data.name,
      profile: data.profile,
    };
  }
}

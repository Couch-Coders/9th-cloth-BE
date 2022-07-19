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
      `${configService.get('app.backendDomain')}/auth/google/login`,
    );
  }

  async getProfileByToken(
    query: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    const { tokens } = await this.google.getToken(query.code);
    const ticket = await this.google.verifyIdToken({
      idToken: tokens.id_token,
      audience: [this.configService.get('google.clientId')],
    });

    const data = ticket.getPayload();

    return {
      id: data.sub,
      email: data.email,
      username: data.name,
      picture: data.picture,
    };
  }
}

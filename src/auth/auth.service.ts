import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SocialInterface } from '../social/interfaces/soical.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateSocialLogin(
    socialData: SocialInterface,
  ): Promise<{ token: string; user: User }> {
    let user: User;
    const socialEmail = socialData.email.toLowerCase();

    const userByEmail = await this.usersService.findByEmail(socialEmail);

    user = await this.usersService.findBySocialId(socialData.id);

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.usersService.update(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else {
      user = await this.usersService.create({
        email: socialData.email,
        username: socialData.username,
        picture: socialData.picture,
        socialId: socialData.id,
      });

      user = await this.usersService.findOne(user.id);
    }

    const jwtToken = this.jwtService.sign({
      id: user.id,
      isSeller: user.isSeller,
    });

    return {
      token: jwtToken,
      user,
    };
  }
}

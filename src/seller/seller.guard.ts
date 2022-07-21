import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = await this.usersService.findOne(request.user.id);
    const storeId: number = parseInt(request.params['id']);
    return user.isSeller === true
        && user.stores?.some(store => store.id === storeId);
  }
}
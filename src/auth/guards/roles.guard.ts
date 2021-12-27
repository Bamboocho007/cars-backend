import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../constants/user-roles';
import { JwtPayload } from '../dtos/jwt-payload.dto';
import { ROLES_KEY } from '../roles.decorator';
import { UsersService } from 'src/users-module/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user: payload }: { user: JwtPayload } = context
      .switchToHttp()
      .getRequest();
    const user = await this.usersService.findOne(payload.sub);

    if (!user) {
      throw new ForbiddenException();
    } else {
      const userHasPermissions = requiredRoles.some(
        (role) => user.role === role,
      );
      if (!userHasPermissions) {
        throw new ForbiddenException();
      }
    }

    return true;
  }
}

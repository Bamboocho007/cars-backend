import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { PublicUser } from 'src/users-module/dtos/public-user.dto';
import { UsersService } from 'src/users-module/users.service';
import { UserRoles } from './constants/user-roles';
import { JwtPayload } from './dtos/jwt-payload.dto';
import { RegistrationPayload } from './dtos/registration-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<PublicUser> | null {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: PublicUser, req: Request) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    req.cookies('token', this.jwtService.sign(payload));
    (req.session as Record<string, any>).token = (
      req.session as Record<string, any>
    ).token
      ? (req.session as Record<string, any>).token
      : this.jwtService.sign(payload);

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async createUser(registrationPayload: RegistrationPayload) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registrationPayload.password, saltOrRounds);
    const fullUser = {
      ...registrationPayload,
      role: UserRoles.User,
      password: hash,
    };
    await this.usersService.create(fullUser);
  }
}

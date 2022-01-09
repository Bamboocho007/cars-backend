import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { PublicUser } from 'src/users-module/dtos/public-user.dto';
import { UsersService } from 'src/users-module/users.service';
import { JWT_EXPIRATION_TIME } from './constants/jwt-expiration-time';
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

  login(user: PublicUser, res: Response): HttpStatus {
    const payload: JwtPayload = { email: user.email, sub: user.id };

    res.cookie('access_token', this.jwtService.sign(payload), {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      expires: new Date(new Date().getTime() + JWT_EXPIRATION_TIME),
    });

    return HttpStatus.OK;
  }

  logOut(res: Response) {
    res.clearCookie('access_token');
    return HttpStatus.OK;
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

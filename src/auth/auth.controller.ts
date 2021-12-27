import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Request as Req, Response } from 'express';
import { PublicUser } from 'src/users-module/dtos/public-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationPayload } from './dtos/registration-payload.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AccessTokenDto } from './dtos/access-token.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Access token',
    type: AccessTokenDto,
  })
  @ApiBody({
    type: LoginDto,
  })
  async login(@Request() req: Req): Promise<AccessTokenDto> {
    return this.authService.login(req.user as PublicUser);
  }

  @ApiResponse({
    status: 200,
    description: 'Registration compleated',
  })
  @Post('registration')
  async registration(
    @Body() body: RegistrationPayload,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.createUser(body);
    res.sendStatus(HttpStatus.CREATED);
  }
}

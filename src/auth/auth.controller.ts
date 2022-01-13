import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PublicUser } from 'src/users-module/dtos/public-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationPayload } from './dtos/registration-payload.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Access token via cookies',
    type: typeof HttpStatus,
  })
  @ApiBody({
    type: LoginDto,
  })
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<HttpStatus> {
    return this.authService.login(req.user as PublicUser, res);
  }

  @Post('logOut')
  @ApiResponse({
    status: 200,
    description: 'Delete cookies token',
    type: typeof HttpStatus,
  })
  async logOut(@Res({ passthrough: true }) res: Response): Promise<HttpStatus> {
    const response = this.authService.logOut(res);
    res.statusCode = HttpStatus.OK;
    return response;
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

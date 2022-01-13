import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/dtos/jwt-payload.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PublicUser } from './dtos/public-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PublicUser,
  })
  @Get('userInfo')
  @UseGuards(JwtAuthGuard)
  public async findById(@Req() req: Request): Promise<PublicUser> {
    const { password, ...rest } = await this.usersService.findOne(
      (req.user as JwtPayload).sub,
    );
    return rest;
  }
}

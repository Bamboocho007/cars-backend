import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class JwtPayload {
  @IsNumber()
  @ApiProperty()
  sub: number;

  @IsEmail()
  @ApiProperty()
  email: string;
}

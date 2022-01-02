import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegistrationPayload {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsString()
  @ApiProperty()
  patronymic: string;

  @IsString()
  @ApiProperty()
  cityId: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEmail()
  @ApiProperty()
  phone: string;
}

import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/auth/constants/user-roles';

export class PublicUser {
  @ApiProperty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  patronymic: string;

  @ApiProperty()
  @IsString()
  cityId: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsEmail()
  phone: string;

  @ApiProperty({ enum: UserRoles })
  @IsNumber()
  role: UserRoles;
}

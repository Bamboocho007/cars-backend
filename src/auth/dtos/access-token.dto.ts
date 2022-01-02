import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty()
  token: string;
}

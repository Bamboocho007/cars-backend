import { ApiProperty } from '@nestjs/swagger';
import { City } from '../city.entity';

export class SubdivisionWithCitiesDto extends City {
  @ApiProperty({ type: [City] })
  children: City[];
}

import { City } from '../city.entity';

export class SubdivisionWithCitiesDto extends City {
  children: City[];
}

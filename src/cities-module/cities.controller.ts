import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { City } from './city.entity';
import { SubdivisionWithCitiesDto } from './dtos/subdivision-with-cities.dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('subdivisions')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [City],
  })
  async getSubdivisions(): Promise<City[]> {
    const cities = await this.citiesService.findAll();
    return cities.filter((c) => c.isRegion);
  }

  @Get('subdivision-with-cities')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [SubdivisionWithCitiesDto],
  })
  async getSubdivisionWithCities(): Promise<SubdivisionWithCitiesDto[]> {
    return this.citiesService.findFullRegionsData();
  }
}

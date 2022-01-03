import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import * as fs from 'fs';
import { City } from './city.entity';
import { SubdivisionWithCitiesDto } from './dtos/subdivision-with-cities.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private citiesRepository: Repository<City>,
  ) {
    this.populateTable();
  }

  findAll(): Promise<City[]> {
    return this.citiesRepository.find();
  }

  findOne(id: number): Promise<City> {
    return this.citiesRepository.findOne(id);
  }

  async findFullRegionsData(): Promise<SubdivisionWithCitiesDto[]> {
    const cities = await this.findAll();
    const regionsList: City[] = [];
    const citiesByRegion: { [key: string]: City[] } = {};

    cities.forEach((c) => {
      if (c.isRegion) {
        regionsList.push(c);
      } else {
        citiesByRegion[c.subdivision]
          ? citiesByRegion[c.subdivision].push(c)
          : [c];
      }
    });

    return regionsList.map((r) => ({
      ...r,
      children: citiesByRegion[r.subdivision],
    }));
  }

  async create(city: Omit<City, 'id'>): Promise<InsertResult> {
    return await this.citiesRepository.insert(city);
  }

  private async populateTable() {
    if (await this.findOne(1)) return;
    const citiesFile = fs.readFileSync('src/public/jsons/cities.json', 'utf8');
    const parsedFile: City[] = JSON.parse(citiesFile);

    for await (const c of parsedFile) {
      await this.create(c);
    }
  }
}

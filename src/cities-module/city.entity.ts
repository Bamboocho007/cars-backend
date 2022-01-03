import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'city_id' })
  @ApiProperty()
  cityId: string;

  @Column()
  @ApiProperty()
  subdivision: string;

  @Column({ name: 'is_region' })
  @ApiProperty()
  isRegion: boolean;
}

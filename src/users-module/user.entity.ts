import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/auth/constants/user-roles';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  patronymic: string;

  @Column({ name: 'city_id' })
  @ApiProperty()
  cityId: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  phone: string;

  @Column()
  @ApiProperty({ enum: UserRoles })
  role: UserRoles;
}

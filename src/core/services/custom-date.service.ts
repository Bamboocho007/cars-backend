import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomDateService {
  tostgresTimestamptoISOString(date: string): string {
    return date + 'Z';
  }
}

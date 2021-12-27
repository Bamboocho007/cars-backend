import { Global, Module } from '@nestjs/common';
import { CustomDateService } from './services/custom-date.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [CustomDateService],
  exports: [CustomDateService],
})
export class CoreModule {}

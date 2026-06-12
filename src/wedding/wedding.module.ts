import { Module } from '@nestjs/common';
import { WeddingController } from './wedding.controller';
import { WeddingService } from './wedding.service';

@Module({
  controllers: [WeddingController],
  providers: [WeddingService],
})
export class WeddingModule {}

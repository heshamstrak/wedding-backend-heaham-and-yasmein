import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WeddingModule } from './wedding/wedding.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [PrismaModule, WeddingModule, AdminModule],
})
export class AppModule {}

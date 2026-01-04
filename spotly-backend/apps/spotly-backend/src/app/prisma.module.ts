import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 important so other modules don’t need to re-import
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

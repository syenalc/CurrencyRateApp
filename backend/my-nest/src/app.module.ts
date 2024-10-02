import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // グローバルに使用できるようにする
    }),
    ItemsModule,
    AuthModule,
    RateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          // sqlite利用
          type: 'sqlite',
          database: config.get<string>('DATABASE_NAME'),
          // postgreSQL利用の場合
          // type: 'postgres',
          // host: config.get<string>('DATABASE_HOST'),
          // port: +config.get<string>('DATABASE_PORT'),
          // username: config.get<string>('DATABASE_USER'),
          // password: config.get<string>('DATABASE_PASSWORD'),
          // database: config.get<string>('DATABASE_NAME'),
          entities: [
            // Entitiesを記載
          ],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // テストしやすいようにmain.tsから分離
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  // Middlewareを利用の場合はこちらに
}

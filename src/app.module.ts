import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StoresModule } from './stores/stores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { AddressesModule } from './addresses/addresses.module';
import authConfig from './config/auth.config';
import googleConfig from './config/google.config';
import { APP_FILTER } from '@nestjs/core';
import { QueryErrorFilter } from './utils/query-error.filter';
import { FilesModule } from './files/files.module';
import cloudinaryConfig from './config/cloudinary.config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ClothesModule } from './clothes/clothes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, googleConfig, databaseConfig, cloudinaryConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    StoresModule,
    AuthModule,
    AuthGoogleModule,
    AddressesModule,
    CloudinaryModule,
    FilesModule,
    ClothesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: QueryErrorFilter,
    },
  ],
})
export class AppModule {}

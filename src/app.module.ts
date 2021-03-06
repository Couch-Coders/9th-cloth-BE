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
import { User } from './users/entities/user.entity';
import { Store } from './stores/entities/store.entity';
import { Style } from './styles/entities/style.entity';
import authConfig from './config/auth.config';
import googleConfig from './config/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        authConfig,
        googleConfig,
        databaseConfig,
      ],
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    StoresModule,
    AuthModule,
    AuthGoogleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

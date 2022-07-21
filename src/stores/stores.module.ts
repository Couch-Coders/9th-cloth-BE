import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { UsersModule } from 'src/users/users.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { APP_GUARD } from '@nestjs/core';
import { SellerGuard } from 'src/seller/seller.guard';

@Module({
  imports: [
    UsersModule,
    AddressesModule,
    TypeOrmModule.forFeature([Store]),    
  ],
  controllers: [StoresController],
  providers: [StoresService],
  exports: [StoresService],
})
export class StoresModule {}

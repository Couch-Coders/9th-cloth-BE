import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from 'src/seller/seller.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@UseGuards(AuthGuard('jwt'), SellerGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressesService.create(createAddressDto)
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Address> {
    return this.addressesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto): Promise<Address> {
    return this.addressesService.update(id, updateAddressDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: number): Promise<void> {
    this.addressesService.softDelete(id);
  }
}

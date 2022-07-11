import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Request() req: any, @Body() createStoreDto: CreateStoreDto) {
    // return this.storesService.create(req.user, createStoreDto);
    return this.storesService.create(createStoreDto)
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.storesService.softDelete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { ClothesService } from './clothes.service';
import { CreateClothDto } from './dto/create-cloth.dto';
import { UpdateClothDto } from './dto/update-cloth.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Clothes')
@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  create(@Body() createClothDto: CreateClothDto) {
    return this.clothesService.create(createClothDto);
  }

  @Get()
  async findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClothDto: UpdateClothDto) {
    return this.clothesService.update(id, updateClothDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.clothesService.softDelete(id);
  }
}

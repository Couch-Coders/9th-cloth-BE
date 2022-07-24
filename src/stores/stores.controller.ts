import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { SellerGuard } from 'src/seller/seller.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Request() req: any, @Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto, req.user);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 25) {
      limit = 25;
    }

    return infinityPagination(
      await this.storesService.findManyWithPagination({
        page,
        limit
      }),
      { page, limit },
    );
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.storesService.findOne(name);
  }

  @Patch(':id')
  @UseGuards(SellerGuard)
  update(@Param('id') id: number, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @UseGuards(SellerGuard)
  softDelete(@Param('id') id: number) {
    return this.storesService.softDelete(id);
  }
}

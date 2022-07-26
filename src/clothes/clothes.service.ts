import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateClothDto } from './dto/create-cloth.dto';
import { UpdateClothDto } from './dto/update-cloth.dto';
import { Cloth } from './entities/cloth.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Cloth) 
    private clothesRepository: Repository<Cloth>
  ) {}

  create(createClothDto: CreateClothDto): Promise<Cloth> {
    return this.clothesRepository.save(
      this.clothesRepository.create({
        ...createClothDto,
      }),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions): Promise<Cloth[]>  {
    return this.clothesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(id: string): Promise<Cloth> {
    return this.clothesRepository.findOne({ id });
  }

  async update(id: string, updateClothDto: UpdateClothDto): Promise<Cloth> {
    return this.clothesRepository.save(
      this.clothesRepository.create({
        id,
        ...updateClothDto,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    this.clothesRepository.softDelete(id);
  }
}

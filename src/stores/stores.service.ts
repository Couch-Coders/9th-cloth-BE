import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  create(userData: User, createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesRepository.save(
      this.storesRepository.create({
        ...createStoreDto,
        author: userData,
      })
    );
  }

  findAll(): Promise<Store[]> {
    return this.storesRepository.find({ relations: ['styles', 'users'] });
  }

  findOne(id: number): Promise<Store> {
    return this.storesRepository.findOne({ id });
  }

  update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    return this.storesRepository.save(
      this.storesRepository.create({
        id,
        ...updateStoreDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    this.storesRepository.softDelete(id);
  }
}

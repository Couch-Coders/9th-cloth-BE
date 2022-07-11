import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { UsersService } from '../users/users.service';
import { plainToClass } from 'class-transformer';
import { Style } from '../styles/entities/style.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private usersService: UsersService,
  ) {}

  async create(createStoreDto: CreateStoreDto, userData?: User): Promise<Store> {
    userData = await this.usersService.findByEmail("test@example.com");
    const styles: Style[] = createStoreDto.styles.map(style => 
      plainToClass(Style, {
        id: style,
      }
    ));
    return this.storesRepository.save(
      this.storesRepository.create({
        ...createStoreDto,
        styles,
        author: userData,
      })
    );
  }

  findAll(): Promise<Store[]> {
    return this.storesRepository.find({ relations: ['styles', 'author', 'addresses'] });
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

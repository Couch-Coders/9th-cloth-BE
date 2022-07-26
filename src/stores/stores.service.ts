import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { UsersService } from '../users/users.service';
import { plainToClass } from 'class-transformer';
import { Style } from '../styles/entities/style.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { validate, ValidationError } from 'class-validator';
import { FilesService } from 'src/files/files.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FileEntity } from 'src/files/entities/file.entity';
import { ClothesService } from 'src/clothes/clothes.service';
import { CreateClothDto } from 'src/clothes/dto/create-cloth.dto';
import { Cloth } from 'src/clothes/entities/cloth.entity';
import { infinityPagination } from 'src/utils/infinity-pagination';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private usersService: UsersService,
    private addressesService: AddressesService,
    private filesService: FilesService,
    private clothesService: ClothesService,
  ) {}

  async create(createStoreDto: CreateStoreDto, userData: User): Promise<Store> {
    const addresses: Address[] = createStoreDto.addresses
      ? await this.addAddresses(createStoreDto)
      : null;
    const styles: Style[] = createStoreDto.styles.map((style) =>
      plainToClass(Style, {
        id: style,
      }),
    );
    userData.isSeller = (
      await this.usersService.update(userData.id, {
        isSeller: true,
      })
    ).isSeller;
    const thumbnails = await Promise.all(createStoreDto.thumbnails.map(id => this.filesService.findById(id)));
    return this.storesRepository.save(
      this.storesRepository.create({
        ...createStoreDto,
        styles,
        addresses,
        thumbnails,
        author: userData,
      }),
    );
  }

  async findManyWithPagination(paginationOptions: IPaginationOptions, styleId?: number): Promise<Store[]>  {
    const paginationData = await this.storesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      select: [
        'id',
        'name',
      ]
    });
    return (styleId !== undefined) ? paginationData.filter(data => data.styles.some(style => style.id === styleId)) : paginationData;
  }

  findOne(name: string): Promise<Store> {
    return this.storesRepository.findOne({ name }, { relations: ['addresses', 'clothes'] });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const addresses: Address[] = updateStoreDto.addresses
      ? await this.addAddresses(updateStoreDto)
      : null;
    let thumbnails: FileEntity[];
    if (updateStoreDto.thumbnails) {
      thumbnails = await Promise.all(updateStoreDto.thumbnails.map(id => this.filesService.findById(id)));
    }
    return this.storesRepository.save(
      this.storesRepository.create({
        id,
        ...updateStoreDto,
        thumbnails,
        addresses,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    this.storesRepository.softDelete(id);
  }

  async createCloth(storeId: number, createClothDto: CreateClothDto): Promise<Cloth> {
    createClothDto.store = await this.storesRepository.findOne(storeId);
    createClothDto.styles = createClothDto.styles.map((style) =>
      plainToClass(Style, {
        id: style,
      }),
    );
    const newClothData: Cloth = await this.clothesService.create(createClothDto);
    return plainToClass(Cloth, {
      id: newClothData.id,
      styles: newClothData.styles,
      thumbnail: newClothData.thumbnail,
    });
  }

  async findAllClothes(storeId: number, page: number, limit: number) {
    return infinityPagination(
      await this.clothesService.findManyWithPagination(storeId, {
        page, limit
      }),
      { page, limit },
    );
  }

  addAddresses(storeDto: CreateStoreDto | UpdateStoreDto): Promise<Address[]> {
    return Promise.all(
      storeDto.addresses.map(async (address: CreateAddressDto | number) => {
        if (typeof address === 'number') {
          return this.addressesService.findOne(address);
        } else if (typeof address === 'object') {
          const newAddressDto = plainToClass(CreateAddressDto, address);
          const errors = await validate(newAddressDto);
          if (errors.length > 0) {
            const message = errors
              .map((error: ValidationError) => Object.values(error.constraints))
              .join(', ');
            throw new BadRequestException(message);
          } else {
            return this.addressesService.create(newAddressDto);
          }
        }
      }),
    );
  }
}

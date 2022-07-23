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

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    private usersService: UsersService,
    private addressesService: AddressesService,
    private filesService: FilesService,
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
    const thumbnails = await this.filesService.findById(createStoreDto.thumbnails);
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

  findAll(): Promise<Store[]> {
    return this.storesRepository.find({ relations: ['author', 'addresses'] });
  }

  findOne(id: number): Promise<Store> {
    return this.storesRepository.findOne({ id });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const addresses: Address[] = updateStoreDto.addresses
      ? await this.addAddresses(updateStoreDto)
      : null;
    if (updateStoreDto.thumbnails) {
      updateStoreDto.thumbnails = await this.filesService.findById(updateStoreDto.thumbnails);
    }
    return this.storesRepository.save(
      this.storesRepository.create({
        id,
        ...updateStoreDto,
        addresses,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    this.storesRepository.softDelete(id);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { StoresService } from 'src/stores/stores.service';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}
  
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressesRepository.save(
      this.addressesRepository.create(createAddressDto)
    );
  }

  findAll(): Promise<Address[]> {
    return this.addressesRepository.find({ relations: ['store'] });
  }

  findOne(id: number): Promise<Address> {
    return this.addressesRepository.findOne({ id });
  }

  update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    return this.addressesRepository.save(
      this.addressesRepository.create({
        id,
        ...updateAddressDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    this.addressesRepository.softDelete(id);
  }
}

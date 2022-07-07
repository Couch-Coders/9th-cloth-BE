import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Style } from 'src/styles/entities/style.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto)
    );
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['styles'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  findBySocialId(socialId: string): Promise<User> {
    return this.usersRepository.findOne({ where: socialId });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.styles) {
      updateUserDto.styles = updateUserDto.styles.map(style => 
        plainToClass(Style, {
          id: style
        }
      ));
    }
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...updateUserDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    this.usersRepository.softDelete(id);
  }
}

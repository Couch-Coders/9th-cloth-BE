import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { FileTypeEnum } from './file-type.enum';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}
  create(path: string): Promise<FileEntity> {
    return this.fileRepository.save(
      this.fileRepository.create({
        path,
      })
    );
  }

  findById(id: string): Promise<FileEntity> {
    return this.fileRepository.findOne({ where: { id: id } });
  }
}

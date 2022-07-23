import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { FileEntity } from 'src/files/entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileTypeEnum } from 'src/files/file-type.enum';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CloudinaryService {
  constructor(
    private filesService: FilesService,
  ) {}

  uploadImages(
    files: Express.Multer.File[],
    type: FileTypeEnum,
  ): Promise<string[]> {
    return Promise.all(files.map(file => 
      new Promise<string>((resolve, reject) => {
        const upload = v2.uploader.upload_stream({
          folder: `${type}/`
        },
          (error, result) => {
          if (error) return reject(error.name);
          this.filesService.create(result.url).then((data: FileEntity) => resolve(data.id));
        });
        toStream(file.buffer).pipe(upload);
      })
    ));
  }
}

import { Module, forwardRef } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [forwardRef(() => FilesModule)],
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}

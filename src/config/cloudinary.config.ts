import { registerAs } from '@nestjs/config';

export default registerAs('cloudinary', () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudKey: process.env.CLOUDINARY_CLOUD_KEY,
  cloudSecret: process.env.CLOUDINARY_CLOUD_SECRET,
}));

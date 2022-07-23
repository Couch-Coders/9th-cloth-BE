import { ConfigService } from "@nestjs/config";
import { ConfigOptions, v2 } from "cloudinary";
import { CLOUDINARY } from "./constants";

export const CloudinaryProvider = {
  inject: [ConfigService],
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService): ConfigOptions => {
    return v2.config({
      cloud_name: configService.get('cloudinary.cloudName'),
      api_key: configService.get('cloudinary.cloudKey'),
      api_secret: configService.get('cloudinary.cloudSecret'),
    });
  }
}
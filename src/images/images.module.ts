import { Module } from '@nestjs/common';
import { ImgService } from './images.service';
import { ImgController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Img } from './model/img.model';
import { MulterModule } from '@nestjs/platform-express';
import { v4 } from 'uuid';

const multer = require('multer');

// Configure the multer file filter
const fileFilter = (req, file, callback) => {
  // Accept only image files with .jpg, .jpeg, or .png extensions
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

@Module({
  imports: [
    SequelizeModule.forFeature([Img]),
    MulterModule.register({
      storage: multer.diskStorage({
        destination: function (req, file, callback) {
          // Specify the destination directory where the images will be stored
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          // Specify the filename of the images
          // You can use the original name, or generate a random name with an extension
          callback(null, `${v4()}.jpeg`);
        },
      }),

      dest: './uploads',
      fileFilter: fileFilter,
    }),
  ],
  controllers: [ImgController],
  providers: [ImgService],
})
export class ImgModule {}

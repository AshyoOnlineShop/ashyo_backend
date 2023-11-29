import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  Res,
  StreamableFile,
  Render
} from '@nestjs/common';
import { ImgService } from './images.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Img } from './model/img.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImgDto } from './dto/create-img.dto';
import { createReadStream, readFileSync } from 'fs';

@ApiTags('Images')
@Controller('images')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @ApiOperation({ summary: 'Create img' })
  @ApiResponse({ type: Img })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, product_id) {
    
    return this.imgService.create(file.filename, product_id)
  }


  @Get(":imgpath")
  seeUploadedFile(@Param('imgpath') image, @Res() res){
    res.set({ 'Content-Type': 'image/jpeg' });
    
    const img = createReadStream(`${process.cwd()}/uploads/${image}`)
    
    return new StreamableFile(img)
  }

  @ApiOperation({ summary: 'Get img' })
  @ApiResponse({ type: [Img] })
  @Get()
  findAll() {
    return this.imgService.findAll();
  }

  @ApiOperation({ summary: 'Get img' })
  @ApiResponse({ type: Img })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(+id);
  }

  // @ApiOperation({ summary: 'Update img' })
  // @ApiResponse({ type: [Number] })
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateImgDto: UpdateImgDto) {
  //   return this.imgService.update(+id, updateImgDto);
  // }

  @ApiOperation({ summary: 'Delete img' })
  @ApiResponse({ type: [Number] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imgService.remove(+id);
  }
}

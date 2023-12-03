import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommercialService } from './commercial.service';
import { CreateCommercialDto } from './dto/create-commercial.dto';
import { Commercial } from './models/commercial.model';
import { UpdateCommercialDto } from './dto/update-commercial.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Commercial')
@Controller('commercial')
export class CommercialController {
  constructor(private readonly commercialService: CommercialService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create commercial' })
  @ApiResponse({ status: 200, description: 'New commercial' })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createCommercial(
    @Body() createCommercialDto: CreateCommercialDto,
    @UploadedFile()
    image: any,
  ) {
    const commercial = await this.commercialService.create(
      createCommercialDto,
      image,
    );
    return commercial;
  }

  @ApiOperation({ summary: 'get all commerciales' })
  @ApiResponse({ status: 200, description: 'get all commercial' })
  @Get('all/:q')
  async getAllCommercial(
    @Query() q: any,
  ): Promise<{ commercials: Commercial[]; count: number }> {
    return this.commercialService.getAllCommercials(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'get commercials by id' })
  @ApiResponse({ status: 200, description: 'get commercial by id' })
  @Get(':id')
  async getCommercialById(@Param('id') id: string): Promise<Commercial> {
    return this.commercialService.getCommercialById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete commercial' })
  @ApiResponse({ status: 200, description: 'delete commercial' })
  @Delete('delete/:id')
  async deleteCommercialById(@Param('id') id: string): Promise<number> {
    return this.commercialService.deleteCommercialById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update commercial' })
  @ApiResponse({ status: 200, description: 'update commercial' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCommercial(
    @Param('id') id: string,
    @Body() updateCommercialDto: UpdateCommercialDto,
    @UploadedFile() image: any,
  ): Promise<Commercial> {
    return this.commercialService.update(+id, updateCommercialDto, image);
  }
}

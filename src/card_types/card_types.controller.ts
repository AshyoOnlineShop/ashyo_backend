import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Card_typesService } from './card_types.service';
import { CreateCard_typesDto } from './dto/create-card_types.dto';
import { Card_types } from './models/card_types.model';
import { UpdateCard_typesDto } from './dto/update-card_types.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Card_types')
@Controller('card_types')
export class Card_typesController {
  constructor(private readonly card_typesService: Card_typesService) {}

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new card type' })
  @ApiResponse({ status: 200, description: 'New card type' })
  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createCard_types(
    @Body() createCard_typesDto: CreateCard_typesDto,
    @UploadedFile() image: any,
  ) {
    const card_types = await this.card_typesService.createCard_types(
      createCard_typesDto,
      image,
    );
    return card_types;
  }

  @ApiOperation({ summary: 'Get all card types' })
  @ApiResponse({ status: 200, description: 'Get all card types' })
  @Get('all')
  async getAllCard_typess(): Promise<Card_types[]> {
    return this.card_typesService.getAllCard_typess();
  }

  @ApiOperation({ summary: 'Get card type by ID' })
  @ApiResponse({ status: 200, description: 'Get card type by ID' })
  @Get(':id')
  async getCard_typesById(@Param('id') id: string): Promise<Card_types> {
    return this.card_typesService.getCard_typesById(+id);
  }

  @ApiOperation({ summary: 'Get card type by name' })
  @ApiResponse({ status: 200, description: 'Get card type by name' })
  @Get('name/:name')
  async getCard_typesByName(@Param('name') name: string): Promise<Card_types> {
    return this.card_typesService.getCard_typesByName(name);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete card type by ID' })
  @ApiResponse({ status: 200, description: 'Delete card type by ID' })
  @Delete('delete/:id')
  async deleteCard_typesById(@Param('id') id: string): Promise<number> {
    return this.card_typesService.deleteCard_typesById(+id);
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update card type by ID' })
  @ApiResponse({ status: 200, description: 'Update card type by ID' })
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateCard_types(
    @Param('id') id: string,
    @Body() updateCard_typesDto: UpdateCard_typesDto,
    @UploadedFile() image: any,
  ) {
    return this.card_typesService.updateCard_types(
      +id,
      updateCard_typesDto,
      image,
    );
  }
}

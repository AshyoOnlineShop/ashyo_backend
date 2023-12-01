import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Attribute } from './model/attribute.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create attribute' })
  @ApiResponse({ type: Attribute })
  @Post('create')
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get attributes' })
  @ApiResponse({ status: 200, description: 'get all attributes' })
  @Get('all/:q')
  findAll(
    @Query() q: any,
  ): Promise<{ attributes: Attribute[]; count: number }> {
    return this.attributeService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'Get attribute' })
  @ApiResponse({ type: Attribute })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update attribute' })
  @ApiResponse({ type: [Number] })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.update(+id, updateAttributeDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete attribute' })
  @ApiResponse({ type: Number })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.attributeService.remove(+id);
  }
}

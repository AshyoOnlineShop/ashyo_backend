import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Attribute } from './model/attribute.model';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @ApiOperation({ summary: 'Create attribute' })
  @ApiResponse({ type: Attribute })
  @Post()
  create(@Body() createAttributeDto: CreateAttributeDto) {
    return this.attributeService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get attributes' })
  @ApiResponse({ type: [Attribute] })
  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @ApiOperation({ summary: 'Get attribute' })
  @ApiResponse({ type: Attribute })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update attribute' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ) {
    return this.attributeService.update(+id, updateAttributeDto);
  }

  @ApiOperation({ summary: 'Delete attribute' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeService.remove(+id);
  }
}

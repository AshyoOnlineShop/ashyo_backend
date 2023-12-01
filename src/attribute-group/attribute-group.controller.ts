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
import { AttributeGroupService } from './attribute-group.service';
import { CreateAttributeGroupDto } from './dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from './dto/update-attribute-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributeGroup } from './model/attribute-group.model';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Attribute group')
@Controller('attribute-group')
export class AttributeGroupController {
  constructor(private readonly attributeGroupService: AttributeGroupService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create attribute group' })
  @ApiResponse({ type: AttributeGroup })
  @Post()
  create(@Body() createAttributeDto: CreateAttributeGroupDto) {
    return this.attributeGroupService.create(createAttributeDto);
  }

  @ApiOperation({ summary: 'Get attribute groups' })
  @ApiResponse({ status: 200, description: 'get all attribute groups' })
  @Get('all/:q')
  findAll(
    @Query() q: any,
  ): Promise<{ attr_groups: AttributeGroup[]; count: number }> {
    return this.attributeGroupService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'Get attribute group' })
  @ApiResponse({ type: AttributeGroup })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeGroupService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update attribute group' })
  @ApiResponse({ type: [Number] })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeGroupDto,
  ) {
    return this.attributeGroupService.update(+id, updateAttributeDto);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete attribute group' })
  @ApiResponse({ type: Number })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeGroupService.remove(+id);
  }
}

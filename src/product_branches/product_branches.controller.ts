import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductBranchesService } from './product_branches.service';
import { CreateProductBranchDto } from './dto/create-product_branch.dto';
import { ProductBranch } from './models/product_branch.model';
import { UpdateProductBranchDto } from './dto/update-product_branch.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';


@ApiTags('ProductBranch')
@Controller('productBranch')
export class ProductBranchesController {
  constructor(private readonly productBranchService: ProductBranchesService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create productBranch' })
  @ApiResponse({ status: 200, description: 'New productBranch' })
  @Post('create')
  async createProductBranch(@Body() createProductBranchDto: CreateProductBranchDto) {
    const productBranch = await this.productBranchService.createProductBranch(
      createProductBranchDto,
    );
    return productBranch;
  }

  
  @ApiOperation({ summary: 'get all productBranches' })
  @ApiResponse({ status: 200, description: 'get all productBranch' })
  @Get('all')
  async getAllProductBranch(): Promise<ProductBranch[]> {
    return this.productBranchService.getAllProductBranchs();
  }

  @ApiOperation({ summary: 'get productBranchs by id' })
  @ApiResponse({ status: 200, description: 'get productBranch by id' })
  @Get(':id')
  async getProductBranchById(@Param('id') id: string): Promise<ProductBranch> {
    return this.productBranchService.getProductBranchById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete productBranch' })
  @ApiResponse({ status: 200, description: 'delete productBranch' })
  @Delete('delete/:id')
  async deleteProductBranchById(@Param('id') id: string): Promise<number> {
    return this.productBranchService.deleteProductBranchById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update productBranch' })
  @ApiResponse({ status: 200, description: 'update productBranch' })
  @Put('update/:id')
  async updateProductBranch(
    @Param('id') id: string,
    @Body() updateProductBranchDto: UpdateProductBranchDto,
  ): Promise<ProductBranch> {
    return this.productBranchService.updateProductBranch(+id, updateProductBranchDto);
  }
}

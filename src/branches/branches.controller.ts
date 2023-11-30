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
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './models/branch.model';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Branch')
@Controller('branch')
export class BranchesController {
  constructor(private readonly branchService: BranchesService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to create branch' })
  @ApiResponse({ status: 200, description: 'New branch' })
  @Post('create')
  async createBranch(@Body() createBranchDto: CreateBranchDto) {
    const branch = await this.branchService.createBranch(createBranchDto);
    return branch;
  }

  @ApiResponse({ status: 200, description: 'get all branch' })
  @Get('all')
  async getAllBranch(): Promise<Branch[]> {
    return this.branchService.getAllBranchs();
  }

  @ApiResponse({ status: 200, description: 'get branch by id' })
  @Get(':id')
  async getBranchById(@Param('id') id: string): Promise<Branch> {
    return this.branchService.getBranchById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to delete branch' })
  @ApiResponse({ status: 200, description: 'delete branch' })
  @Delete('delete/:id')
  async deleteBranchById(@Param('id') id: string): Promise<number> {
    return this.branchService.deleteBranchById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'to update branch' })
  @ApiResponse({ status: 200, description: 'update branch' })
  @Put('update/:id')
  async updateBranch(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch> {
    return this.branchService.updateBranch(+id, updateBranchDto);
  }
}

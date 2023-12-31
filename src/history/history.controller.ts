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
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './models/history.model';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGuard } from './../guards/customer.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Create a new history' })
  @ApiResponse({ status: 200, description: 'New history created' })
  @Post('create')
  async createHistory(@Body() createHistoryDto: CreateHistoryDto) {
    const history = await this.historyService.createHistory(createHistoryDto);
    return history;
  }

  // @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all histories' })
  @ApiResponse({ status: 200, description: 'Get all histories' })
  @Get('all/:q')
  async getAllHistories(
    @Query() q: any,
  ): Promise<{ histories: History[]; count: number }> {
    return this.historyService.getAllHistories(q?.page, q?.limit);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get history by ID' })
  @ApiResponse({ status: 200, description: 'Get history by ID' })
  @Get(':id')
  async getHistoryById(@Param('id') id: string): Promise<History> {
    return this.historyService.getHistoryById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Delete history by ID' })
  @ApiResponse({ status: 200, description: 'Delete history by ID' })
  @Delete('delete/:id')
  async deleteHistoryById(@Param('id') id: string): Promise<number> {
    return this.historyService.deleteHistoryById(+id);
  }

  // @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update history' })
  @ApiResponse({ status: 200, description: 'Update history' })
  @Put('update/:id')
  async updateHistory(
    @Param('id') id: string,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    return this.historyService.updateHistory(+id, updateHistoryDto);
  }
}

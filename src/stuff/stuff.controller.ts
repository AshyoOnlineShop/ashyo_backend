import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StuffService } from './stuff.service';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Stuff } from './models/stuff.model';
import { LoginStuffDto } from './dto/login-stuff.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ChangeStuffPasswordDto } from './dto/change-stuff-password.dto';
import { UpdateStuffActivenessDto } from './dto/update-stuff-activeness.dto';
import { StuffSelfGuard } from '../guards/stuff.self.guard';
import { SuperadminGuard } from '../guards/superadmin.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Stuff')
@Controller('stuff')
export class StuffController {
  constructor(private readonly stuffService: StuffService) {}

  @UseGuards(SuperadminGuard)
  @ApiOperation({ summary: 'Get all stuffs' })
  @Get('all')
  async getAllStuff() {
    return this.stuffService.getAllStuff();
  }

  @UseGuards(SuperadminGuard)
  @ApiOperation({ summary: 'Get stuff by id' })
  @Get(':id')
  async getStuffById(@Param('id') id: string) {
    return this.stuffService.getStuffById(+id);
  }

  @UseGuards(SuperadminGuard)
  @ApiOperation({ summary: 'Delete stuff' })
  @Delete('delete/:id')
  async deleteStuffById(@Param('id') id: string) {
    return this.stuffService.deleteStuffById(+id);
  }

  @ApiOperation({ summary: 'Update stuff' })
  @Put('update/:id')
  async updateStuff(
    @Param('id') id: string,
    @Body() updateStuffDto: UpdateStuffDto,
  ) {
    return this.stuffService.updateStuff(+id, updateStuffDto);
  }

  @ApiOperation({ summary: 'Change stuff password' })
  @Put('change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() changeStuffPasswordDto: ChangeStuffPasswordDto,
  ) {
    const { oldPassword, newPassword } = changeStuffPasswordDto;

    const updatedStuff = await this.stuffService.changePassword(
      id,
      oldPassword,
      newPassword,
    );

    if (!updatedStuff) {
      return { message: 'Password change failed.' };
    }

    return { message: 'Password changed successfully.' };
  }

  @UseGuards(SuperadminGuard)
  @ApiOperation({ summary: 'Change stuff activeness' })
  @Put('activeness/:id')
  async changeStuffActiveness(
    @Param('id') id: number,
    @Body() updateStuffActivenessDto: UpdateStuffActivenessDto,
  ) {
    try {
      const updatedStuff = await this.stuffService.updateStuffActiveness(
        id,
        updateStuffActivenessDto,
      );
      return {
        message: 'Stuff activeness updated successfully.',
        stuff: updatedStuff,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }
  // ================= AUTH ==================================================
  // @UseGuards(SuperadminGuard)
  @ApiOperation({ summary: 'Signup Stuff' })
  @ApiResponse({ status: 201, type: Stuff })
  @Post('signup')
  signup(
    @Body() createStuffDto: CreateStuffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.stuffService.signup(createStuffDto, res);
  }

  @ApiOperation({ summary: 'Login Stuff' })
  @ApiResponse({ status: 200, type: Stuff })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginStuffDto: LoginStuffDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.stuffService.login(loginStuffDto, res);
  }

  @ApiOperation({ summary: 'Logout Stuff' })
  @ApiResponse({ status: 200, type: Stuff })
  @HttpCode(HttpStatus.OK)
  @Post('signout/:id')
  logout(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.stuffService.logout(refreshToken, res, id);
  }

  @ApiOperation({ summary: 'Activate Stuff' })
  @ApiResponse({ status: 200, type: [Stuff] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.stuffService.activate(link);
  }

  @ApiOperation({ summary: 'Refresh stuff token' })
  @Post('refresh/:id')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.stuffService.refreshToken(+id, refreshToken, res);
  }
}

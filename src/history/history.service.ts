import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { History } from './models/history.model';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History)
    private historyRepo: typeof History,
  ) {}

  async createHistory(createHistoryDto: CreateHistoryDto): Promise<History> {
    const history = await this.historyRepo.create(createHistoryDto);
    return history;
  }

  async getAllHistories(
    page: number,
    limit: number,
  ): Promise<{ histories: History[]; count: number }> {
    try {
      let page1: number = +page > 0 ? +page : 1;
      let limit1: number = +limit > 0 ? +limit : null;

      const histories = await this.historyRepo.findAll({
        include: { all: true },
        offset: (page1 - 1) * limit1,
        limit: limit1,
      });

      const count = await this.historyRepo.count();
      return { histories, count };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Bad request from client');
    }
  }

  async getHistoryById(id: number): Promise<History> {
    const history = await this.historyRepo.findOne({
      where: { id },
      include: { all: true },
    });
    //   if (!history) throw new Error('No such history');
    //   return history;
    // }
    //   });
    return history;
  }

  async deleteHistoryById(id: number): Promise<number> {
    return this.historyRepo.destroy({ where: { id } });
  }

  async updateHistory(
    id: number,
    updateHistoryDto: UpdateHistoryDto,
  ): Promise<History> {
    const history = await this.historyRepo.update(updateHistoryDto, {
      where: { id },
      returning: true,
    });
    console.log(history);

    return history[1][0].dataValues;
  }
}

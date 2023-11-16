import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch)
    private branchRepo: typeof Branch,
  ) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = await this.branchRepo.create(createBranchDto);
    return branch;
  }

  async getAllBranchs(): Promise<Branch[]> {
    const branch = await this.branchRepo.findAll({ include: { all: true } });
    return branch;
  }

  async getBranchById(id: number): Promise<Branch> {
    const branch = await this.branchRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return branch;
  }

  async deleteBranchById(id: number): Promise<number> {
    return this.branchRepo.destroy({ where: { id } });
  }

  async updateBranch(
    id: number,
    updateBranchDto: UpdateBranchDto,
  ): Promise<Branch> {
    const branch = await this.branchRepo.update(updateBranchDto, {
      where: { id },
      returning: true,
    });

    return branch[1][0].dataValues;
  }
}

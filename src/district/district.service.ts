import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './model/district.model';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private districtRepo: typeof District,
  ) {}
}

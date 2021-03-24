import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url, UrlDocument } from './url.schema';
import { CreateUrlDto } from './create.url.dto';

@Injectable()
export class UrlShortnerService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const createdCat = new this.urlModel(createUrlDto);
    return createdCat.save();
  }

  async findAll(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }

  async finUrl(id: string): Promise<Url> {
    return this.urlModel.findOne({ id: id }).exec();
  }
}

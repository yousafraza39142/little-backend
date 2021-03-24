import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UrlShortnerService } from './url-shortner.service';
import { Response } from 'express';
import { Url } from './url.schema';
import { nanoid } from 'nanoid';

@Controller('shortner')
export class UrlShortnerController {
  constructor(private readonly shortnerService: UrlShortnerService) {}

  @Post()
  async create(@Body() body: any) {
    if (!body?.url) {
      throw new HttpException('No url Found', 400);
    }
    // let id = md5(body?.url);
    body.url = (body.url as string).replace(/^(https:\/\/)|^(http:\/\/)/, '');
    let id = nanoid(7);
    id = id.substr(0, 3) + id.substring(id.length - 4);
    body = {
      url: body?.url,
      id,
    };

    const result = await this.shortnerService.create(body);
    return { url: `http://localhost:3000/shortner/${result?.id}` };
  }

  @Get(':id')
  async getUrl(@Param('id') id: string, @Res() res: Response) {
    const data = await this.shortnerService.finUrl(id);
    res.redirect(`https://${data.url}`);
  }

  @Get()
  async findAll(): Promise<Url[]> {
    return this.shortnerService.findAll();
  }
}

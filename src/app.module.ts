import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlShortnerModule } from './url-shortner/url-shortner.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://system:system@cluster0.qp5yh.mongodb.net/urlShortner?retryWrites=true&w=majority',
    ),
    UrlShortnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

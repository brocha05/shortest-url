import { Controller, Post, Body } from '@nestjs/common';
import { EncryptUrlService } from './encrypt-url.service';
import { Auth } from 'src/auth/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('encrypt-url')
@ApiBearerAuth()
@Auth()
@Controller('encrypt-url')
export class EncryptUrlController {
  constructor(private readonly encryptUrlService: EncryptUrlService) {}

  @Post()
  async shortenUrl(@Body() body: {longUrl: string}){
    const shortUrl = await this.encryptUrlService.shorten(body.longUrl);
    return shortUrl;
  }

  @Post('/getOriginal')
  async redirectToOriginal(@Body() body: {shortUrl: string}) {
    const originalUrl = await this.encryptUrlService.getOriginalUrl(body.shortUrl);
    return { url: originalUrl };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EncryptUrl } from './entities/encrypt-url.entity';

@Injectable()
export class EncryptUrlService {
  constructor(
    @InjectModel(EncryptUrl.name)
    private readonly encryptModel: Model<EncryptUrl>,
  ) { }

  async shorten(longUrl: string) {
    // Divide the url
    const urlParts = longUrl.split('/');
    const protocol = urlParts[0];
    const domain = urlParts[2];
    const pathParts = urlParts.slice(3);
    // Obtain the initial of the words in the last part of the URL
    const middlePart = pathParts.map(part => part[0]).join('');
    // Generates a random string
    const randomPart = generateRandomString(8);

    function generateRandomString(length) {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomString = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    }
    // Build the shortened URL
    const shortUrl = `${protocol}//${domain}/${middlePart}/${randomPart}`;

    const urlEntity = await this.encryptModel.create({
      originalUrl: longUrl,
      encodedUrl: shortUrl
    });
    return urlEntity;
  }

  async getOriginalUrl(encodedUrl: string) {
    // Search the original URL in the database
    const urlEntity = await this.encryptModel.findOne({ encodedUrl });

    if (urlEntity) {
      return urlEntity.originalUrl;
    }

    return null;
  }
}

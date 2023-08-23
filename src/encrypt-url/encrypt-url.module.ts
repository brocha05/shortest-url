import { Module } from '@nestjs/common';
import { EncryptUrlService } from './encrypt-url.service';
import { EncryptUrlController } from './encrypt-url.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptUrl, EncryptUrlSchema } from './entities/encrypt-url.entity';

@Module({
  controllers: [EncryptUrlController],
  providers: [EncryptUrlService],
  imports: [MongooseModule.forFeature([
    {
      name: EncryptUrl.name,
      schema: EncryptUrlSchema,
    },
  ]), AuthModule],
  exports: [MongooseModule]
})
export class EncryptUrlModule { }

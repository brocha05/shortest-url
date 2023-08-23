import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class EncryptUrl extends Document {
  @ApiProperty()
  @Prop()
  originalUrl: string;

  @ApiProperty()
  @Prop()
  encodedUrl: string;
}

export const EncryptUrlSchema = SchemaFactory.createForClass(EncryptUrl);
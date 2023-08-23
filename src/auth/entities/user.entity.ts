import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class users extends Document {
  @ApiProperty()
  @Prop({ type: String })
  email: string;

  @ApiProperty()
  @Prop({ type: String })
  password: string;

  @ApiProperty()
  @Prop({ type: String })
  fullName: string;

  @ApiProperty()
  @Prop({type: Number})
  age: number;
}

export const UsuariosSchema = SchemaFactory.createForClass(users);

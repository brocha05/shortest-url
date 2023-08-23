import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  @Min(1)
  @IsPositive()
  age: number;
}

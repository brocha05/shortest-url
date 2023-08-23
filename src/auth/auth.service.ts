import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { users } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(users.name)
    private readonly AuthModel: Model<users>,
    private readonly jwtService: JwtService,
  ) { }

  async create(crearUsuarioDto: CreateUserDto) {
    const { fullName, password, ...userData } = crearUsuarioDto;

    // Verify if user exists
    const userExists = await this.AuthModel.exists({ fullName });
    if (userExists) {
      throw new BadRequestException('The user is already taken');
    }

    // Create new user
    const user = new this.AuthModel({
      ...userData,
      fullName,
      password: bcrypt.hashSync(password, 10),
    });

    await user.save();

    return {
      user: user,
      token: this.getJwtToken({ fullName: user.fullName }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.AuthModel.findOne(
      {
        email: email,
      },
      {
        email: 1,
        password: 1,
        id: 1,
        fullName: 1,
      },
    );
    if (!user) throw new UnauthorizedException('Invalid credentials (username)');

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials (password)');

    return {
      fullName: user.fullName,
      user: user,
      message: `Welcome back ${user.fullName}`,
      token: this.getJwtToken({ fullName: user.fullName }),
    };
    //Return JWT
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}

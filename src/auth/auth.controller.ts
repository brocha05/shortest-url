import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { users } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('auth')
@ApiResponse({ type: users })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() crearUsuarioDto: CreateUserDto) {
    return this.authService.create(crearUsuarioDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}

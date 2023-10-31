import { Controller, Get, Post, Body, HttpCode, HttpStatus, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
  
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Patch(':id')
  varifyUser(@Param('id') id: string){
    return this.authService.varifyUser(+id);
  }
  
  
}

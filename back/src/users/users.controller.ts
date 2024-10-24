import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash, compare } from 'bcryptjs';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.usersService.create(createUserDto);
  }
  @Post('login')
  async login( @Body() body: { email: string; password: string }, @Res() res: Response) {
    const { email, password } = body;
    console.log(email,password)
    

    const { token } = await this.usersService.login(email, password);
    
    const cookieOptions = {
      expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production',
       
    };
    console.log("Las cookies son: " + JSON.stringify(cookieOptions));

    res.cookie('jwt', token, cookieOptions);
    return res.status(200).json({ message: 'Inicio de sesión exitoso' }); // Devuelve el mensaje sin usar res.status
  }

  @Get('Users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } 
   @Post('logout')
  logout(@Res() res: Response) {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.status(200).json({ message: 'Cierre de sesión exitoso' });
  }
}

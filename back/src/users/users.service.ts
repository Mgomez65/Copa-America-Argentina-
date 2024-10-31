import { Injectable, NotFoundException, UnauthorizedException,HttpStatus, HttpException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
  private jwtService: JwtService)
   {}

  
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    
    if(await this.userRepository.findOne({where:{ email:createUserDto.email}})){
      return new HttpException("El correo ya existe",HttpStatus.CONFLICT)
    }
    if(await this.userRepository.findOne({where:{ username:createUserDto.username}})){
      return new HttpException("El Nombre de Usuario  existe",HttpStatus.CONFLICT)
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    this.userRepository.save(newUser);
    return  new HttpException("Ususario registrado",HttpStatus.OK)
    
  }


  findAll() {
    return this.userRepository.find(); 
  }

  async login(email: string, password: string) {
    console.log(email)
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(!user,user)

    if (!user) {
      throw new HttpException("Email no encontrado", HttpStatus.NOT_FOUND);
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw  new HttpException("Contraseña Incorrecta",HttpStatus.NOT_FOUND);
    }
  
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { message: 'Inicio de sesión exitoso', token }; // Asegúrate de devolver el token aquí
  }


  findUser(id: number) {
    return this.userRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // if(await this.userRepository.findOne({where:{email:updateUserDto.email}})){
    //     return new 
    // }
    await this.userRepository.update(id, updateUserDto); 
    return this.findUser(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id); 
    return new HttpException("Usuario eliminado con existo",HttpStatus.OK)
  }
}

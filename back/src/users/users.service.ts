import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
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
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    console.log(newUser)
    return this.userRepository.save(newUser);
  }
  findAll() {
    return this.userRepository.find(); // Devuelve todos los usuarios
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
  
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { message: 'Inicio de sesión exitoso', token }; // Asegúrate de devolver el token aquí
  }




  findOne(id: number) {
    return this.userRepository.findOne({where:{id}}); // Devuelve un usuario específico
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto); // Actualiza el usuario
    return this.findOne(id); // Retorna el usuario actualizado
  }

  async remove(id: number) {
    await this.userRepository.delete(id); // Elimina el usuario
    return { deleted: true }; // Retorna un objeto de éxito
  }
}

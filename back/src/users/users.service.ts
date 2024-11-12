import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Verificar si el correo ya está registrado
    if (
      await this.userRepository.findOne({
        where: { email: createUserDto.email },
      })
    ) {
      throw new HttpException('El correo ya existe', HttpStatus.CONFLICT);
    }

    // Verificar si el nombre de usuario ya está registrado
    if (
      await this.userRepository.findOne({
        where: { username: createUserDto.username },
      })
    ) {
      throw new HttpException(
        'El Nombre de Usuario ya existe',
        HttpStatus.CONFLICT,
      );
    }

    // Crear el nuevo usuario con la contraseña cifrada
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return {
      message: 'Usuario registrado correctamente',
      statusCode: HttpStatus.CREATED,
    };
  }

  // Obtener todos los usuarios
  findAll() {
    return this.userRepository.find();
  }

  // Login de usuario
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Email no encontrado', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Contraseña Incorrecta', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { message: 'Inicio de sesión exitoso', token };
  }

  // Buscar un usuario por su id
  findUser(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  // Actualizar usuario
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findUser(id);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findUser(id);
  }

  // Eliminar un usuario
  async remove(id: number) {
    const user = await this.findUser(id);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
    return {
      message: 'Usuario eliminado con éxito',
      statusCode: HttpStatus.OK,
    };
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  username: 'testUser',
  password: 'hashedPassword',
};

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('fakeToken'),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Consistencia en el nombre de la entidad
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)); // Consistencia en el nombre
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un usuario', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const createUserDto = {
        email: 'test@example.com',
        username: 'testUser',
        password: 'password123',
      };

      const result = await service.create(createUserDto);

      expect(result).toEqual({
        message: 'Usuario registrado correctamente',
        statusCode: HttpStatus.CREATED,
      });
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashedPassword',
      });
    });

    it('debería lanzar un error si el correo ya existe', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const createUserDto = {
        email: 'test@example.com',
        username: 'testUser',
        password: 'password123',
      };

      await expect(service.create(createUserDto)).rejects.toThrow(
        new HttpException('El correo ya existe', HttpStatus.CONFLICT),
      );
    });
  });

  describe('login', () => {
    it('debería retornar un token si las credenciales son correctas', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.login('test@example.com', 'password123');

      expect(result).toEqual({
        message: 'Inicio de sesión exitoso',
        token: 'fakeToken',
      });
    });

    it('debería lanzar un error si el correo no existe', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(
        service.login('test@example.com', 'password123'),
      ).rejects.toThrow(
        new HttpException('Email no encontrado', HttpStatus.NOT_FOUND),
      );
    });

    it('debería lanzar un error si la contraseña es incorrecta', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        service.login('test@example.com', 'wrongPassword'),
      ).rejects.toThrow(
        new HttpException('Contraseña Incorrecta', HttpStatus.UNAUTHORIZED),
      );
    });
  });

  describe('findUser', () => {
    it('debe devolver el usuario cuando se encuentra por ID', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findUser(1);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('debe lanzar una excepción si el usuario no se encuentra', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findUser(1)).rejects.toThrow(
        new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND),
      );
    });
  });
});

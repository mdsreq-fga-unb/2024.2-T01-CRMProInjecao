import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const result = { id: '1', ...createUserDto };

    mockUserService.create.mockResolvedValue(result);

    await expect(controller.create(createUserDto)).resolves.toEqual(result);
    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should find all users', async () => {
    const result = [
      { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123' },
    ];
    mockUserService.findAll.mockResolvedValue(result);

    await expect(controller.findAll()).resolves.toEqual(result);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const result = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123' };
    mockUserService.findOneById.mockResolvedValue(result);

    await expect(controller.findOneById('1')).resolves.toEqual(result);
    expect(mockUserService.findOneById).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = { name: 'Updated User' };
    const result = { id: '1', name: 'Updated User', email: 'test@example.com', password: 'password123' };

    mockUserService.update.mockResolvedValue(result);

    await expect(controller.update('1', updateUserDto)).resolves.toEqual(result);
    expect(mockUserService.update).toHaveBeenCalledWith('1', updateUserDto);
  });

  it('should remove a user', async () => {
    const result = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password123' };
    mockUserService.remove.mockResolvedValue(result);

    await expect(controller.remove('1')).resolves.toEqual(result);
    expect(mockUserService.remove).toHaveBeenCalledWith('1');
  });
});

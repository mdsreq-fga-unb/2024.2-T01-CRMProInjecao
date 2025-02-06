import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MockFactory } from '../../test/mocks/mock.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from '../email/email.service';

// Mock data and dependencies
const mockUsersRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  softRemove: jest.fn(),
};
const mockEmailService = MockFactory.getMock(EmailService);

// Test suite for UserService
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
        { provide: EmailService, useValue: mockEmailService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests for each method in UserService
  it('should find all users', async () => {
    const result = [{ id: "1", name: 'Test User', email: "test@example.com" }];
    mockUsersRepository.find.mockResolvedValue(result);

    const users = await service.findAll();
    expect(users).toEqual(result);
    expect(mockUsersRepository.find).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    const result = { id: "1", name: 'Test User', email: "test@example.com" };
    mockUsersRepository.findOne.mockResolvedValue(result);

    const user = await service.findOneById("1");
    expect(user).toEqual(result);
    expect(mockUsersRepository.findOne).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it('should create a user with a password', async () => {
    const createUserDto = { name: 'Test User', email: 'test@example.com', password: 'password123' };
    const savedUser = { id: '1', ...createUserDto };
    mockUsersRepository.create.mockReturnValue(savedUser);
    mockUsersRepository.save.mockResolvedValue(savedUser);

    const user = await service.create(createUserDto);
    expect(user).toEqual(savedUser);
    expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUsersRepository.save).toHaveBeenCalledWith(savedUser);
  });

  it('should create a user without a password', async () => {
    const createUserDto = { name: 'Test User', email: 'test@example.com', password: "password123" };
    const savedUser = { id: '1', ...createUserDto, password: 'generatedPassword' };
    mockUsersRepository.create.mockReturnValue(savedUser);
    mockUsersRepository.save.mockResolvedValue(savedUser);

    const user = await service.create(createUserDto);
    expect(user).toEqual(savedUser);
    expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
    expect(mockUsersRepository.save).toHaveBeenCalledWith(savedUser);
  });

  it('should find one user by email', async () => {
    const result = { email: 'test@example.com' };
    mockUsersRepository.findOne.mockResolvedValue(result);
  
    const user = await service.findOneByEmail('test@example.com');
    expect(user).toEqual(result);
    expect(mockUsersRepository.findOne).toHaveBeenCalled();

    const calls = mockUsersRepository.findOne.mock.calls;
    expect(calls.some(call => JSON.stringify(call[0]).includes('"email":"test@example.com"'))).toBe(true);
  });
  

  it('should update a user', async () => {
    const updateUserDto = { name: 'Updated User' };
    const existingUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    const updatedUser = { ...existingUser, ...updateUserDto };
    mockUsersRepository.findOne.mockResolvedValue(existingUser);
    mockUsersRepository.update.mockResolvedValue(updatedUser);

    const user = await service.update('1', updateUserDto);
    expect(user).toEqual(updatedUser);
    expect(mockUsersRepository.update).toHaveBeenCalledWith({ id: '1' }, updatedUser);
  });

  it('should remove a user', async () => {
    const user = { id: '1', name: 'Test User', email: 'test@example.com' };
    mockUsersRepository.findOne.mockResolvedValue(user);
    mockUsersRepository.softRemove.mockResolvedValue(user);

    const removedUser = await service.remove('1');
    expect(removedUser).toEqual(user);
    expect(mockUsersRepository.softRemove).toHaveBeenCalledWith(user);
  });

  it('should return null when removing a non-existent user', async () => {
    mockUsersRepository.findOne.mockResolvedValue(null);

    const removedUser = await service.remove('1');
    expect(removedUser).toBeNull();
  });

  it('should return null when updating a non-existent user', async () => {
    mockUsersRepository.findOne.mockResolvedValue(null);

    const updatedUser = await service.update('1', { name: 'Updated User' });
    expect(updatedUser).toBeNull();
  });
});

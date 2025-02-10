import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('TokenService', () => {
  let service: TokenService;

  // Mock para TokenRepository
  const mockTokenRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  // Mock para JwtService
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockedToken'),
    verify: jest.fn(),
  };

  // Mock para UserService
  const mockUserService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: 'TokenRepository', useValue: mockTokenRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

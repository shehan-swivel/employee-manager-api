import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

class MockConfigService {
  // Define mock methods or properties here
  get(key: string): any {
    // Return mock values based on the key
    if (key === 'API_KEY') {
      return 'mock-api-key';
    }
    // Add more conditions for other keys if needed
    return null;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When validateApiKey is called', () => {
    describe('with a valid API Key', () => {
      it('should return true', () => {
        const result = service.validateApiKey('mock-api-key');
        expect(result).toEqual(true);
      });
    });

    describe('with an invalid API Key', () => {
      it('should return false', () => {
        const result = service.validateApiKey('invalid-mock-api-key');
        expect(result).toEqual(false);
      });
    });
  });
});

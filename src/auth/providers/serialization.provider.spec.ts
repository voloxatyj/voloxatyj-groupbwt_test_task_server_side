import { Test, TestingModule } from '@nestjs/testing';
import { AuthSerializer } from './serialization.provider';

describe('AuthSerializer', () => {
  let provider: AuthSerializer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSerializer],
    }).compile();

    provider = module.get<AuthSerializer>(AuthSerializer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

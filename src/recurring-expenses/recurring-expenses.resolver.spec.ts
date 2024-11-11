import { Test, TestingModule } from '@nestjs/testing';
import { RecurringExpensesResolver } from './recurring-expenses.resolver';

describe('RecurringExpensesResolver', () => {
  let resolver: RecurringExpensesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecurringExpensesResolver],
    }).compile();

    resolver = module.get<RecurringExpensesResolver>(RecurringExpensesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

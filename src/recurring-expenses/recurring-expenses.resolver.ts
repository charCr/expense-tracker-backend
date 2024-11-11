import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Int,
  Float,
} from '@nestjs/graphql';
import { Frequency } from '@prisma/client';
import { CategoryType } from 'src/categories/categories.resolver';
import { UserType } from 'src/users/users.resolver';
import { RecurringExpensesService } from './recurring-expenses.service';

@ObjectType()
class RecurringExpenseType {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String)
  frequency: string;

  @Field(() => Date)
  nextDueDate: Date;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => UserType)
  user: UserType;
}

@Resolver(() => RecurringExpenseType)
export class RecurringExpensesResolver {
  constructor(
    private readonly recurringExpensesService: RecurringExpensesService
  ) {}

  @Query(() => [RecurringExpenseType])
  async recurringExpenses(): Promise<RecurringExpenseType[]> {
    return this.recurringExpensesService.findAllRecurringExpenses() as any;
  }
}

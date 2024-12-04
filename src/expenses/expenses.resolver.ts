import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Int,
  Float,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';
import { CategoryType } from 'src/categories/categories.resolver';
import { UserType } from 'src/users/users.resolver';

@ObjectType()
export class ExpenseType {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  date: Date;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => Int)
  categoryId: number;

  @Field(() => UserType)
  user: UserType;

  @Field(() => Int)
  userId: number;

  //   @Field(() => [TagType])
  //   tags: TagType[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@Resolver(() => ExpenseType)
export class ExpensesResolver {
  constructor(private readonly expensesService: ExpensesService) {}

  @Query(() => [ExpenseType])
  async expenses(): Promise<ExpenseType[]> {
    const expenses = await this.expensesService.getAllExpenses();
    return expenses.map((expense) => ({
      id: expense.id,
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      categoryId: expense.categoryId,
      userId: expense.userId,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      user: expense.user as UserType,
      category: expense.category as CategoryType,
    }));
  }
  @Mutation(() => ExpenseType)
  async createExpense(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('amount', { type: () => Float }) amount: number,
    @Args('description', { type: () => String, nullable: true })
    description?: string,
    @Args('date', { type: () => Date, nullable: true }) date?: Date
  ): Promise<ExpenseType> {
    const expense = await this.expensesService.createExpense(
      userId,
      categoryId,
      amount,
      description,
      date
    );
    return {
      id: expense.id,
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      categoryId: expense.categoryId,
      userId: expense.userId,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      user: expense.user as UserType,
      category: expense.category as CategoryType,
    };
  }
}

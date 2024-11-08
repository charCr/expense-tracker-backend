import {
  Resolver,
  ObjectType,
  Field,
  Int,
  Float,
  Query,
} from '@nestjs/graphql';
import { BudgetsService } from './budgets.service';
import { Budget } from '@prisma/client';
import { CategoryType } from 'src/categories/categories.resolver';
import { UserType } from 'src/users/users.resolver';

@ObjectType()
export class BudgetType {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  amount: number;

  @Field()
  period: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => UserType)
  user: UserType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@Resolver(() => BudgetType)
export class BudgetsResolver {
  constructor(readonly budgetsService: BudgetsService) {}

  @Query(() => [BudgetType])
  async budgets(): Promise<BudgetType[]> {
    //TODO: Figure out type mismatch
    return (await this.budgetsService.getAllBudgets()) as any;
    // return budgets.map((budget) => ({
    //   id: budget.id,
    //   amount: budget.amount,
    //   period: budget.period,
    //   categoryId: budget.categoryId,
    //   userId: budget.userId,
    //   category: {
    //     ...budget.category,
    //     expenses: budget.category.expenses,
    //   },
    //   user: budget.user,
    //   createdAt: budget.createdAt,
    //   updatedAt: budget.updatedAt,
    // }));
  }
}

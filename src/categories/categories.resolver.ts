import { Resolver, ObjectType, Query, Field, Int } from '@nestjs/graphql';
import { ExpenseType } from 'src/expenses/expenses.resolver';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';

@ObjectType()
export class CategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [ExpenseType])
  expenses: ExpenseType[];

  //   @Field(() => [BudgetType])
  //   budgets: BudgetType[];

  //   @Field(() => [RecurringExpenseType])
  //   recurringExpenses: RecurringExpenseType[];
}

@Resolver(() => CategoryType)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => [CategoryType])
  async categories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategories();
  }
}

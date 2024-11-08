import { Injectable } from '@nestjs/common';
import { Budget, Category, Expense, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type CategoryWithExpenses = Category & {
  expenses: Expense[];
};
type BudgetWithRelations = Budget & {
  category: CategoryWithExpenses;
  user: User;
};

@Injectable()
export class BudgetsService {
  constructor(readonly prismaService: PrismaService) {}
  async getAllBudgets(): Promise<BudgetWithRelations[]> {
    return await this.prismaService.budget.findMany({
      include: {
        category: {
          include: {
            expenses: true,
          },
        },
        user: true,
      },
    });
  }
}

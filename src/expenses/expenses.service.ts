import { Injectable } from '@nestjs/common';
import { Category, Expense, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllExpenses(): Promise<
    (Expense & { user: User; category: Category })[]
  > {
    return this.prismaService.expense.findMany({
      include: {
        user: true,
        category: true,
      },
    });
  }
  async createExpense(
    userId: number,
    categoryId: number,
    amount: number,
    description?: string,
    date?: Date
  ): Promise<Expense & { user: User; category: Category }> {
    return this.prismaService.expense.create({
      data: {
        userId,
        categoryId,
        amount,
        description,
        date: date || new Date(),
      },
      include: {
        user: true,
        category: true,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Category, Expense, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

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
}

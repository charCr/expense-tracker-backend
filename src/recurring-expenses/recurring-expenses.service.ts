import { Injectable } from '@nestjs/common';
import { Category, RecurringExpense, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecurringExpensesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRecurringExpenses(): Promise<
    (RecurringExpense & { category: Category; user: User })[]
  > {
    return this.prismaService.recurringExpense.findMany({
      include: { category: true, user: true },
    });
  }
}

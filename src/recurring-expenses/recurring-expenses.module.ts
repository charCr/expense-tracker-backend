import { Module } from '@nestjs/common';
import { RecurringExpensesResolver } from './recurring-expenses.resolver';
import { RecurringExpensesService } from './recurring-expenses.service';

@Module({
  providers: [RecurringExpensesResolver, RecurringExpensesService]
})
export class RecurringExpensesModule {}

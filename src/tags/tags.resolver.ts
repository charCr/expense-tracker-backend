import { Field, Int, ObjectType, Resolver, Query } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { ExpenseType } from 'src/expenses/expenses.resolver';

@ObjectType()
export class TagType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [ExpenseType])
  expenses: ExpenseType[];
}

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => [TagType])
  async tags(): Promise<TagType[]> {
    return this.tagsService.findAllTags() as any;
  }
}

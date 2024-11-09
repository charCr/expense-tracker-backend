import { Resolver, Query, ObjectType, Field, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@ObjectType()
export class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  // Exclude password from GraphQL schema for security
}

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    const result = await this.usersService.getAllUsers();
    return result;
  }
}

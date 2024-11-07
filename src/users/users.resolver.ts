import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class UserType {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  // Exclude password from GraphQL schema for security
}

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserType])
  async users(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}

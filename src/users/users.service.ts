import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    const result = await this.prisma.user.findMany();
    return result;
  }

  // Add more user-related methods (e.g., createUser, findUserById)
}

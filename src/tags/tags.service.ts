import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Expense, Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prismaService: PrismaService) {}

  async findAllTags(): Promise<(Tag & { expenses: Expense[] })[]> {
    return this.prismaService.tag.findMany({
      include: { expenses: true },
    });
  }
}

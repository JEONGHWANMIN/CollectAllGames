import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(postId: number, user: JwtPayload, dto: CommentDto) {
    await this.prisma.comment.create({
      data: {
        content: dto.content,
        postId,
        userId: user.userId,
      },
    });
    return {
      message: 'Comment created successfully',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(postId: number, userId: number, dto: CommentDto) {
    await this.prisma.comment.create({
      data: {
        content: dto.content,
        postId,
        userId,
      },
    });
    return {
      message: 'Comment created successfully',
    };
  }

  async delete(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (comment.userId !== userId) {
      throw new Error('You are not authorized to delete this comment');
    }

    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return {
      message: 'Comment deleted successfully',
    };
  }

  async update(commentId: number, userId: number, dto: CommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (comment.userId !== userId) {
      throw new Error('You are not authorized to update this comment');
    }

    await this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Comment updated successfully',
    };
  }
}

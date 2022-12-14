import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, size: number, userId?: number | undefined) {
    const posts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            comment: true,
            likes: true,
          },
        },
        tags: {
          select: {
            tag: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!posts) {
      throw new NotFoundException('Posts not found');
    }

    const response = posts.map((post) => {
      return {
        ...post,
        username: post.user.username,
        commentCount: post._count.comment,
        likeCount: post._count.likes,
        tag: post.tags.map((tag) => tag.tag.title),
        like: post.likes.some((like) => like.userId === userId),
      };
    });

    response.forEach((post) => {
      delete post.user;
      delete post.tags;
      delete post._count;
      delete post.videoUrl;
      delete post.likes;
      delete post.ogTitle;
    });

    const totalPage = Math.ceil(posts.length / size);
    const offset = (page - 1) * size;
    const limit = offset + size;

    const pagenationPage = response.slice(offset, limit);

    return {
      posts: pagenationPage,
      totalPage,
    };
  }

  async findOne(postId: number, userId?: number | undefined) {
    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        comment: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                title: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comment: true,
            likes: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const response = {
      ...post,
      username: post.user.username,
      userId: post.user.id,
      tag: post.tags.map((tag) => tag.tag.title),
      like: post.likes.some((like) => like.userId === userId),
      commentCount: post._count.comment,
      likeCount: post._count.likes,
      comment: post.comment.map((comment) => {
        return {
          ...comment,
          username: comment.user.username,
        };
      }),
    };

    delete response.tags;
    delete response.user;
    delete response.likes;
    delete response._count;
    response.comment.forEach((commen) => {
      delete commen.user;
    });

    return response;
  }

  async create(dto: PostDto, user: JwtPayload) {
    if (!dto.link.includes('youtu.be') || !dto.link.includes('https')) {
      throw new BadRequestException('Invalid link');
    }

    const options = { url: dto.link };

    let result1;
    try {
      const { result }: any = await ogs(options);
      result1 = result;
    } catch (e) {
      throw new NotFoundException('Link not found');
    }

    const tagMap = dto.tags.map((tag) => {
      return {
        tag: {
          connectOrCreate: {
            where: {
              title: tag,
            },
            create: {
              title: tag,
            },
          },
        },
      };
    });

    await this.prisma.post.create({
      data: {
        title: dto.title,
        link: dto.link,
        content: dto.content,
        imgUrl: result1.ogImage.url,
        videoUrl: result1.ogVideo.url,
        ogTitle: result1.ogTitle,
        userId: user.userId,
        tags: {
          create: tagMap,
        },
      },
    });

    return {
      message: 'Post created successfully',
    };
  }

  async update(postId: number, userId: number, dto: UpdatePostDto) {
    const post = await this.findOne(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this post');
    }

    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });

    return {
      message: 'Post updated successfully',
    };
  }

  async delete(postId: number, userId: number) {
    const post = await this.findOne(postId);

    if (post.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this post');
    }

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return {
      message: 'Post deleted successfully',
    };
  }

  async like(postId: number, userId: number) {
    try {
      await this.prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      return {
        message: 'Post liked successfully',
        like: true,
      };
    } catch {
      throw new ConflictException('Post already liked');
    }
  }

  async unlike(postId: number, userId: number) {
    try {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            postId,
            userId,
          },
        },
      });

      return {
        message: 'Post unliked successfully',
        like: false,
      };
    } catch {
      throw new ConflictException('Post already unliked');
    }
  }
}

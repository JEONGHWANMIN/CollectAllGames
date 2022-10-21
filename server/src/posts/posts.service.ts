import {
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

  async findAll(page: number, size: number) {
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
      },
    });

    console.log(posts);

    if (!posts) {
      throw new NotFoundException('Posts not found');
    }

    const result = posts.map((post) => {
      return {
        ...post,
        username: post.user.username,
        commentCount: post._count.comment,
        likeCount: post._count.likes,
        tag: post.tags.map((tag) => tag.tag.title),
      };
    });

    result.forEach((post) => {
      delete post.user;
      delete post.tags;
      delete post._count;
    });

    const totalPage = Math.ceil(posts.length / size);
    const offset = (page - 1) * size;
    const limit = offset + size;

    const pagenationPage = result.slice(offset, limit);

    return {
      posts: pagenationPage,
      totalPage,
    };
  }

  async findOne(postId: number) {
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
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const response = {
      ...post,
      username: post.user.username,
      tag: post.tags.map((tag) => tag.tag.title),
    };

    delete response.tags;
    delete response.user;

    return response;
  }

  async create(dto: PostDto, user: JwtPayload) {
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

    const options = { url: dto.link };

    const { result }: any = await ogs(options);

    const data = {
      // ogTitle: result.ogTitle,
      // ogDescription: result.ogDescription,
      ogImageUrl: result.ogImage.url,
      ogVideoUrl: result.ogVideo.url,
    };

    await this.prisma.post.create({
      data: {
        title: dto.title,
        link: dto.link,
        content: dto.content,
        imgUrl: data.ogImageUrl,
        videoUrl: data.ogVideoUrl,
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
    console.log(postId, userId, dto);

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
  }

  async unlike(postId: number, userId: number) {
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
  }
}

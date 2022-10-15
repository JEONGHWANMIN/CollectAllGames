import { Injectable, NotFoundException } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import { JwtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

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
      },
    });

    if (!posts) {
      throw new Error('Posts not found');
    }

    const totalPage = Math.ceil(posts.length / size);
    const offset = (page - 1) * size;
    const limit = offset + size;

    const pagenationPage = posts.slice(offset, limit);

    return {
      posts: pagenationPage,
      totalPage,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    const comments = await this.prisma.comment.findMany({
      where: {
        postId: id,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return {
      post,
      comments,
    };
  }

  async create(dto: PostDto, user: JwtPayload) {
    const options = { url: dto.link };

    const { result }: any = await ogs(options);

    const data = {
      ogTitle: result.ogTitle,
      ogDescription: result.ogDescription,
      ogImageUrl: result.ogImage.url,
      ogVideoUrl: result.ogVideo.url,
    };

    await this.prisma.post.create({
      data: {
        ...dto,
        imgUrl: data.ogImageUrl,
        videoUrl: data.ogVideoUrl,
        userId: user.userId,
      },
    });

    return {
      message: 'Post created successfully',
    };
  }
}

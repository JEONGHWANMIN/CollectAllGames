import { Injectable, NotFoundException } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, size: number) {
    const posts = await this.prisma.post.findMany();

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

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async create(dto: PostDto) {
    console.log(dto);

    return 'Hello';
    const options = { url: dto.link };
    let data;
    try {
      const { result }: any = await ogs(options);
      data = {
        ogTitle: result.ogTitle,
        ogDescription: result.ogDescription,
        ogImageUrl: result.ogImage.url,
        ogVideoUrl: result.ogVideo.url,
      };
    } catch (error) {
      console.log(error);
    }

    console.log(data);

    return {
      message: 'Post created successfully',
    };
  }
}

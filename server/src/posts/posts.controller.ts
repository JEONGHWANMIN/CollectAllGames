import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('')
  create(@Body() body: { link: string }) {
    console.log(body);
    return this.postsService.create(body.link);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { PostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Public()
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.postsService.findAll(page, size);
  }

  @Public()
  @Get(':postId')
  findOne(@Param('postId', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post('')
  create(@Body() dto: PostDto, @GetCurrentUser() user: JwtPayload) {
    return this.postsService.create(dto, user);
  }

  @Delete(':postId')
  delete(
    @Param('postId', ParseIntPipe) id: number,
    @GetCurrentUser() user: JwtPayload,
  ) {
    return this.postsService.delete(id, user);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post('')
  create(@Body() dto: PostDto, @GetCurrentUser() user) {
    console.log(dto, user);
    return this.postsService.create(dto);
  }
}

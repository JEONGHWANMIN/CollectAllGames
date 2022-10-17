import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { PostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';
import { responseSchemas } from './schema';

@ApiTags('Post API')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiBody({
    schema: responseSchemas.findAll,
  })
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
  findOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findOne(postId);
  }

  @Post('')
  create(@Body() dto: PostDto, @GetCurrentUser() user: JwtPayload) {
    return this.postsService.create(dto, user);
  }

  @Patch(':postId')
  update(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, userId, dto);
  }

  @Delete(':postId')
  delete(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.delete(postId, userId);
  }
}

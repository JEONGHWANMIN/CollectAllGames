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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { PostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';
import { bodySchemas, responseSchemas } from './schema';

@ApiTags('Post API')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiNotFoundResponse({
    description: '게시글 조회가 실패했습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 목록 조회 성공',
    schema: responseSchemas.findAll,
  })
  @Get()
  @Public()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @GetCurrentUser() user: JwtPayload,
  ) {
    return this.postsService.findAll(page, size, user?.userId);
  }

  @ApiNotFoundResponse({
    description: '게시글 조회가 실패했습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '게시글 조회 성공',
    schema: responseSchemas.findOne,
  })
  @Public()
  @Get(':postId')
  findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser() user: JwtPayload,
  ) {
    return this.postsService.findOne(postId, user?.userId);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    schema: bodySchemas.create,
  })
  @ApiCreatedResponse({
    description: '게시글 작성 성공',
    schema: responseSchemas.create,
  })
  @Post('')
  create(@Body() dto: PostDto, @GetCurrentUser() user: JwtPayload) {
    return this.postsService.create(dto, user);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiBody({
    schema: bodySchemas.update,
  })
  @ApiOkResponse({
    description: '글 수정 성공',
    schema: responseSchemas.update,
  })
  @ApiForbiddenResponse({
    description: '권한이 없습니다.',
  })
  @Patch(':postId')
  update(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.update(postId, userId, dto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    description: '게시글 삭제 성공',
    schema: responseSchemas.delete,
  })
  @ApiForbiddenResponse({
    description: '권한이 없습니다.',
  })
  @Delete(':postId')
  delete(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.delete(postId, userId);
  }

  @Post(':postId/like')
  like(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.like(postId, userId);
  }

  @Delete(':postId/like')
  unlike(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.unlike(postId, userId);
  }
}

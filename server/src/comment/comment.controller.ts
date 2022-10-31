import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUser } from 'src/common/decorators';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';
import { responseSchemas, requestSchemas } from './schema';

@ApiTags('Comment API')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
})
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiResponse({
    status: 201,
    description: '댓글 생성 성공',
    schema: responseSchemas.create,
  })
  @ApiBody({
    schema: requestSchemas.create,
  })
  @HttpCode(201)
  @Post(':postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.create(postId, userId, dto);
  }

  @ApiResponse({
    status: 200,
    description: '댓글 삭제 성공',
    schema: responseSchemas.delete,
  })
  @ApiForbiddenResponse({
    description: '댓글 삭제 권한이 없습니다.',
  })
  @Delete(':commentId')
  delete(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetCurrentUser('userId') userId: number,
  ) {
    return this.commentService.delete(commentId, userId);
  }

  @ApiBody({
    schema: requestSchemas.update,
  })
  @ApiResponse({
    status: 200,
    description: '댓글 수정 성공',
    schema: responseSchemas.update,
  })
  @ApiForbiddenResponse({
    description: '댓글 수정 권한이 없습니다.',
  })
  @Put(':commentId')
  update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.update(commentId, userId, dto);
  }
}

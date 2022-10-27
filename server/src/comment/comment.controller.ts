import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetCurrentUser } from 'src/common/decorators';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.create(postId, userId, dto);
  }

  @Delete(':commentId')
  delete(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetCurrentUser('userId') userId: number,
  ) {
    return this.commentService.delete(commentId, userId);
  }

  @Put(':commentId')
  update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetCurrentUser('userId') userId: number,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.update(commentId, userId, dto);
  }
}

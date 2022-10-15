import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { GetCurrentUser } from 'src/common/decorators';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @GetCurrentUser() user: JwtPayload,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.create(postId, user, dto);
  }
}

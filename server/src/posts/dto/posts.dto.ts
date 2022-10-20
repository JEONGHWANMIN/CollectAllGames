import { ArrayMaxSize, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  link: string;

  @ArrayMaxSize(3)
  tags: string[];
}

export class UpdatePostDto {
  title: string;

  content: string;
}

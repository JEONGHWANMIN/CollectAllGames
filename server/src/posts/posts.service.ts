import { Injectable } from '@nestjs/common';
import * as ogs from 'open-graph-scraper';

@Injectable()
export class PostsService {
  async create(link: string) {
    const options = { url: link };
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

    return 'Hello I:"m a post';
  }
}

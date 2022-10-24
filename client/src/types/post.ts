export interface Post {
  commentCount: number;
  content: string;
  createdAt: string;
  id: number;
  imgUrl: string;
  like: boolean;
  likeCount: number;
  link: string;
  tag: string[];
  title: string;
  updatedAt: string;
  userId: number;
  username: string;
  view: number;
}

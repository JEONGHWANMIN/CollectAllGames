export interface HomePost {
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

export interface Post {
  id: number;
  title: string;
  content: string;
  ogTitle: string;
  link: string;
  imgUrl: string;
  videoUrl: string;
  view: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  comment: Comment[];
  username: string;
  tag: string[];
  like: boolean;
  commentCount: number;
  likeCount: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  postId: number;
  username: string;
}

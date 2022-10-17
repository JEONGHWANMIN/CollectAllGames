import { Post } from '../types';
export const responseSchemas = {
  findAll: {
    type: 'object',
    properties: {
      posts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            content: { type: 'string' },
            link: { type: 'string' },
            imgUrl: { type: 'string' },
            videoUrl: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            userId: { type: 'number' },
            user: {
              type: 'object',
              properties: {
                username: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
};

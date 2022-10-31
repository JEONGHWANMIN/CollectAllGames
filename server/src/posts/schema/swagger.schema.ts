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
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            userId: { type: 'number' },
            username: { type: 'string' },
            view: { type: 'number' },
            commentCount: { type: 'number' },
            likeCount: { type: 'number' },
            tag: {
              type: 'array',
              items: { type: 'string' },
            },
            like: { type: 'boolean' },
          },
        },
      },
      totalPage: { type: 'number' },
    },
  },

  findOne: {
    type: 'object',
    properties: {
      post: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          content: { type: 'string' },
          link: { type: 'string' },
          imgUrl: { type: 'string' },
          videoUrl: { type: 'string' },
          view: { type: 'number' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          ogTitle: { type: 'string' },
          userId: { type: 'number' },
          username: { type: 'string' },
          comment: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                content: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                userId: { type: 'number' },
                username: { type: 'string' },
                postId: { type: 'number' },
              },
            },
          },
        },
      },
    },
  },

  create: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Post created successfully',
      },
    },
  },

  update: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Post updated successfully',
      },
    },
  },

  delete: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Post deleted successfully',
      },
    },
  },

  like: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Post liked successfully',
      },
      like: { type: 'boolean' },
    },
  },

  unlike: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Post unliked successfully',
      },
      like: { type: 'boolean' },
    },
  },
};

export const reqeustSchemas = {
  create: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      link: { type: 'string' },
      tag: { type: 'array', items: { type: 'string' } },
    },
  },
  update: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
    },
  },
};

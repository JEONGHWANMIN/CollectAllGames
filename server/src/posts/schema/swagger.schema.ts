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
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          userId: { type: 'number' },
          user: {
            type: 'object',
            properties: {
              username: { type: 'string' },
            },
          },
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
};

export const bodySchemas = {
  create: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      content: { type: 'string' },
      link: { type: 'string' },
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

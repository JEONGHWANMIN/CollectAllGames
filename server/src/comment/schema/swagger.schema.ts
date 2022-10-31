export const responseSchemas = {
  create: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Comment created successfully',
      },
    },
  },

  update: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Comment updated successfully',
      },
    },
  },

  delete: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Comment deleted successfully',
      },
    },
  },
};

export const requestSchemas = {
  create: {
    type: 'object',
    properties: {
      content: { type: 'string' },
    },
  },

  update: {
    type: 'object',
    properties: {
      content: { type: 'string' },
    },
  },
};

export const responseSchemas = {
  signup: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'User created successfully' },
    },
  },
  login: {
    type: 'object',
    properties: {
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' },
    },
  },
  logout: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'User logged out successfully' },
    },
  },
};

export const bodySchemas = {
  signup: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },

  login: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
};

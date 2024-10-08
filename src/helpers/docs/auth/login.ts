export default {
    post: {
      tags: ['Auth'],
      description: 'Login',
      operationId: 'login',
      parameters: [
        {
          name: 'email',
          in: 'body',
          schema: {
            type: 'string',
            description: 'email',
            example: 'eduardo@gmail.com',
          },
        },
        {
          name: 'password',
          in: 'body',
          schema: {
            type: 'string',
            description: 'password',
            example: '*************',
          },
        }
      ],
  
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                  },
                  data: {
                    type: 'object',
                    $ref: '#/components/schemas/AuthLogin',
                    null: true,
                  },
                  message: {
                    type: 'string',
                    null: true,
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    null: true,
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    null: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
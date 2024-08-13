export default {
    post: {
      tags: ['Places'],
      description: 'Create Place',
      operationId: 'create',
      parameters: [
        {
          name: 'name',
          in: 'formData',
          schema: {
            type: 'string',
            description: 'name',
            example: 'Sala C14',
          },
        },
        {
          name: 'capacity',
          in: 'formData',
          schema: {
            type: 'number',
            description: 'capacity',
            example: '10',
          },
        },
        {
          name: 'photo',
          in: 'formData',
          schema: {
            type: 'file',
            description: 'photo',
            example: 'image.png',
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
                    $ref: '#/components/schemas/Places',
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
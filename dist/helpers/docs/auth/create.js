"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Auth'],
        description: 'Create User',
        operationId: 'create',
        parameters: [
            {
                name: 'name',
                in: 'body',
                schema: {
                    type: 'string',
                    description: 'name',
                    example: 'Eduardo Afonso',
                },
            },
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
            },
            {
                name: 'phone',
                in: 'body',
                schema: {
                    type: 'string',
                    description: '99999999',
                    example: '99999999',
                },
            },
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
                                    $ref: '#/components/schemas/User',
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

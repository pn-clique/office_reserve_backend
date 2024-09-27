"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ['Modality'],
        description: 'Create modality',
        operationId: 'createModality',
        parameters: [
            {
                name: 'name',
                in: 'body',
                schema: {
                    type: 'string',
                    description: 'name',
                    example: 'Meio-dia',
                },
            },
            {
                name: 'description',
                in: 'body',
                schema: {
                    type: 'string',
                    description: 'description',
                    example: 'Das 8h as 10h',
                },
            },
            {
                name: 'price',
                in: 'body',
                schema: {
                    type: 'string',
                    description: 'price',
                    example: '30,000',
                },
            },
            {
                name: 'duration',
                in: 'body',
                schema: {
                    type: 'string',
                    description: 'duration',
                    example: '4',
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
                                    $ref: '#/components/schemas/Modality',
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

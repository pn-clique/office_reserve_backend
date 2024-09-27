"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Modality"],
        description: "Get Modality By Id",
        operationId: "getByIdModality",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    type: "string",
                    description: "Id da modalidade",
                    example: "uidbnfndm",
                },
            },
        ],
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                },
                                data: {
                                    type: "object",
                                    $ref: "#/components/schemas/Modality",
                                    null: true,
                                },
                                message: {
                                    type: "string",
                                    null: true,
                                },
                            },
                        },
                    },
                },
            },
            400: {
                description: "Bad Request",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                    example: false,
                                },
                                message: {
                                    type: "string",
                                    null: true,
                                },
                            },
                        },
                    },
                },
            },
            500: {
                description: "Internal Server Error",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                success: {
                                    type: "boolean",
                                    example: false,
                                },
                                message: {
                                    type: "string",
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

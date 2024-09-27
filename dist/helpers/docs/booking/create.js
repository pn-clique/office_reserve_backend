"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    post: {
        tags: ["Bookings"],
        description: "Create Bookings",
        operationId: "createBookings",
        parameters: [
            {
                name: "name",
                in: "body",
                schema: {
                    type: "string",
                    description: "name",
                    example: "Reversa 001",
                },
            },
            {
                name: "description",
                in: "body",
                schema: {
                    type: "string",
                    description: "description",
                    example: "Reserva",
                },
            },
            {
                name: "initDate",
                in: "body",
                schema: {
                    type: "string",
                    description: "initDate",
                    example: "13/08/2024",
                },
            },
            {
                name: "finalDate",
                in: "body",
                schema: {
                    type: "string",
                    description: "finalDate",
                    example: "13/08/2024",
                },
            },
            {
                name: "modalityId",
                in: "body",
                schema: {
                    type: "string",
                    description: "modalityId",
                    example: "uifnj32j",
                },
            },
            {
                name: "placeId",
                in: "body",
                schema: {
                    type: "string",
                    description: "placeId",
                    example: "uidji38",
                },
            },
            {
                name: "email",
                in: "body",
                schema: {
                    type: "string",
                    description: "email",
                    example: "email@coworking.com",
                },
            },
            {
                name: "phone",
                in: "body",
                schema: {
                    type: "string",
                    description: "phone",
                    example: "936654821",
                },
            },
            {
                name: "startTime",
                in: "body",
                schema: {
                    type: "string",
                    description: "startTime",
                    example: "13:00",
                },
            },
            {
                name: "endTime",
                in: "body",
                schema: {
                    type: "string",
                    description: "endTime",
                    example: "15:00",
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
                                    $ref: "#/components/schemas/Bookings",
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

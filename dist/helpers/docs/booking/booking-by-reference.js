"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get: {
        tags: ["Bookings"],
        description: "Get Bookings By Reference",
        operationId: "getByIdBookingReference",
        parameters: [
            {
                name: "reference",
                in: "path",
                schema: {
                    type: "string",
                    description: "referencia da reserva",
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

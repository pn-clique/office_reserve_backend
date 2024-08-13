export default {
  get: {
    tags: ["Places"],
    description: "Get Places By Id",
    operationId: "getById",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          type: "string",
          description: "Id do lugar",
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
                  $ref: "#/components/schemas/Places",
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

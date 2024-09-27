"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty",
});
exports.default = Prisma;

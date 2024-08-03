import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

export default Prisma;
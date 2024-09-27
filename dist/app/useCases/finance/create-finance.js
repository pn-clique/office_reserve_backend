"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinanceUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class CreateFinanceUseCase {
    async execute(request) {
        try {
            const finance = await prisma_db_1.default.finance.create({ data: request });
            return (0, contracts_1.successResponse)(finance);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.CreateFinanceUseCase = CreateFinanceUseCase;

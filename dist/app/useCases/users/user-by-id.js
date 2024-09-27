"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserByIdUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class UserByIdUseCase {
    async execute(request) {
        try {
            const user = await prisma_db_1.default.user.findUnique({ where: { id: request.id } });
            if (!user) {
                return (0, contracts_1.badRequestResponse)({ message: 'User not found' });
            }
            return (0, contracts_1.successResponse)(user);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.UserByIdUseCase = UserByIdUseCase;

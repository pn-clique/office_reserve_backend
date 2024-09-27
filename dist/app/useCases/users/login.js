"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUseCase {
    async execute(request) {
        try {
            const user = await prisma_db_1.default.user.findUnique({ where: { email: request.email } });
            if (!user) {
                return (0, contracts_1.badRequestResponse)({ message: 'User not found' });
            }
            const isValidPassword = bcrypt_1.default.compareSync(request.password, String(user.password));
            if (!isValidPassword) {
                return (0, contracts_1.badRequestResponse)({ message: 'Invalid credentials' });
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'e0836deb27a4e0e9f2cb4a0f67a33c85', { expiresIn: '1d' });
            const data = { user, token };
            return (0, contracts_1.successResponse)(data);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.LoginUseCase = LoginUseCase;

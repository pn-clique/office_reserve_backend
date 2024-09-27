"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordUserUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ResetPasswordUserUseCase {
    async execute(request) {
        try {
            const findUser = await prisma_db_1.default.user.findUnique({
                where: { email: request.email },
            });
            if (!findUser) {
                return (0, contracts_1.badRequestResponse)({
                    message: "User not exists",
                });
            }
            if (request.password_token !== findUser?.password_token) {
                return (0, contracts_1.badRequestResponse)({
                    message: "Code invalid.",
                });
            }
            const now = new Date();
            if (findUser?.password_Expires) {
                if (now > findUser?.password_Expires) {
                    return (0, contracts_1.badRequestResponse)({
                        message: "Token expired, generate a new token.",
                    });
                }
            }
            let password;
            if (request.password) {
                const salt = bcrypt_1.default.genSaltSync(10);
                password = bcrypt_1.default.hashSync(request.password, salt);
            }
            const user = await prisma_db_1.default.user.update({
                where: { id: findUser.id },
                data: {
                    password: password
                },
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'e0836deb27a4e0e9f2cb4a0f67a33c85', { expiresIn: '1d' });
            const data = { user, token };
            return (0, contracts_1.successResponse)(data);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.ResetPasswordUserUseCase = ResetPasswordUserUseCase;

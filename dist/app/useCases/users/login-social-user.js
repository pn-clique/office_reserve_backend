"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSocialUserUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginSocialUserUseCase {
    async execute(request) {
        try {
            const userExists = await prisma_db_1.default.user.findUnique({
                where: { email: request.email },
            });
            if (userExists) {
                const token = jsonwebtoken_1.default.sign({ userId: userExists.id }, "e0836deb27a4e0e9f2cb4a0f67a33c85", { expiresIn: "1d" });
                const data = { user: userExists, token };
                return (0, contracts_1.successResponse)(data);
            }
            const user = await prisma_db_1.default.user.create({
                data: {
                    name: request.name,
                    email: request.email,
                    phone: request.phone,
                    photo: request.photo,
                    type_user: request.typeUser,
                },
            });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, "e0836deb27a4e0e9f2cb4a0f67a33c85", { expiresIn: "1d" });
            const data = { user, token };
            return (0, contracts_1.successResponse)(data);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.LoginSocialUserUseCase = LoginSocialUserUseCase;

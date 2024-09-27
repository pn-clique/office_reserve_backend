"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CreateUserUseCase {
    async execute(request) {
        try {
            const email = await prisma_db_1.default.user.findUnique({ where: { email: request.email } });
            if (email) {
                return (0, contracts_1.badRequestResponse)({ message: "Email already exists" });
            }
            let password;
            if (request.password) {
                const salt = bcrypt_1.default.genSaltSync(10);
                password = bcrypt_1.default.hashSync(request.password, salt);
            }
            const user = await prisma_db_1.default.user.create({
                data: {
                    name: request.name,
                    email: request.email,
                    password,
                    phone: request.phone,
                    type_user: request.typeUser,
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
exports.CreateUserUseCase = CreateUserUseCase;

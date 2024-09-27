"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class EditUserUseCase {
    async execute(request) {
        try {
            const findUser = await prisma_db_1.default.user.findUnique({
                where: { id: request.id },
            });
            if (!findUser) {
                return (0, contracts_1.badRequestResponse)({
                    message: "User not exists",
                });
            }
            request.name = request.name ?? findUser.name;
            request.email = request.email ?? findUser.email;
            request.phone = request.phone ?? findUser.phone;
            const photo = request.photo === '' ? findUser.photo : request.photo;
            let password;
            if (request.password) {
                const salt = bcrypt_1.default.genSaltSync(10);
                password = bcrypt_1.default.hashSync(request.password, salt);
            }
            else {
                password = findUser.password;
            }
            const user = await prisma_db_1.default.user.update({ where: { id: request.id }, data: {
                    name: request.name,
                    phone: request.phone,
                    email: request.email,
                    photo: photo,
                    password: password
                } });
            return (0, contracts_1.successResponse)(user);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.EditUserUseCase = EditUserUseCase;

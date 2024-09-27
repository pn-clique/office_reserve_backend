"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlaceUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class CreatePlaceUseCase {
    async execute(request) {
        try {
            if (request.capacity <= 0) {
                return (0, contracts_1.badRequestResponse)({ message: "Capacity must be greater than 0" });
            }
            const place = await prisma_db_1.default.place.create({ data: request });
            return (0, contracts_1.successResponse)(place);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.CreatePlaceUseCase = CreatePlaceUseCase;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePlaceUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class DeletePlaceUseCase {
    async execute(request) {
        try {
            const places = await prisma_db_1.default.place.findUnique({ where: { id: request.id } });
            if (!places) {
                return (0, contracts_1.badRequestResponse)({ message: 'Place not found' });
            }
            const place = await prisma_db_1.default.place.delete({ where: { id: request.id } });
            return (0, contracts_1.successResponse)(places);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.DeletePlaceUseCase = DeletePlaceUseCase;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllPlaceUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class AllPlaceUseCase {
    async execute() {
        try {
            const places = await prisma_db_1.default.place.findMany();
            return (0, contracts_1.successResponse)(places);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.AllPlaceUseCase = AllPlaceUseCase;

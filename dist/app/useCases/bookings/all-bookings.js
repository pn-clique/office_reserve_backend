"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllBookingsUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class AllBookingsUseCase {
    async execute() {
        try {
            const bookings = await prisma_db_1.default.booking.findMany({
                include: {
                    user: true,
                    place: true,
                    modality: true,
                },
            });
            return (0, contracts_1.successResponse)(bookings);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.AllBookingsUseCase = AllBookingsUseCase;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingByUserIdUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class BookingByUserIdUseCase {
    async execute(request) {
        try {
            const booking = await prisma_db_1.default.booking.findMany({
                where: { user_id: request },
                include: { user: true, place: true, modality: true },
            });
            if (!booking) {
                return (0, contracts_1.badRequestResponse)({ message: "User not have bookings" });
            }
            return (0, contracts_1.successResponse)(booking);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.BookingByUserIdUseCase = BookingByUserIdUseCase;

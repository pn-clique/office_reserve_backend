"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBookingUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class EditBookingUseCase {
    async execute(request) {
        try {
            const findBooking = await prisma_db_1.default.booking.findUnique({
                where: { id: request.id },
            });
            if (!findBooking) {
                return (0, contracts_1.badRequestResponse)({
                    message: "Booking not exists",
                });
            }
            const booking = await prisma_db_1.default.booking.update({
                where: { id: request.id },
                data: {
                    status: request.status,
                },
            });
            return (0, contracts_1.successResponse)(booking);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.EditBookingUseCase = EditBookingUseCase;

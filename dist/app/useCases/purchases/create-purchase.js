"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class CreatePurchaseUseCase {
    async execute(request) {
        try {
            const booking = await prisma_db_1.default.booking.findUnique({ where: { id: request.bookingId }, include: { modality: true } });
            if (!booking) {
                return (0, contracts_1.badRequestResponse)({ message: 'Booking not found' });
            }
            const purchaseOrder = await prisma_db_1.default.purchaseOrder.create({ data: {
                    booking_id: request.bookingId,
                    total_price: booking.modality.price,
                } });
            return (0, contracts_1.successResponse)(purchaseOrder);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.CreatePurchaseUseCase = CreatePurchaseUseCase;

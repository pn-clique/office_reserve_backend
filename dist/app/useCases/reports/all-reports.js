"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllReportsUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class AllReportsUseCase {
    async execute(request) {
        try {
            const user = await prisma_db_1.default.user.findMany({
                where: {
                    id: request.id,
                },
                select: {
                    Booking: {
                        select: {
                            place: true,
                            PurchaseOrder: true,
                            modality: true
                        }
                    },
                }
            });
            if (!user) {
                return (0, contracts_1.badRequestResponse)({ message: "User not found" });
            }
            const [bookings] = user;
            return (0, contracts_1.successResponse)(bookings);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.AllReportsUseCase = AllReportsUseCase;

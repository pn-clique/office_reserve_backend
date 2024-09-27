"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const contracts_1 = require("../../../@shareds/contracts");
const enums_1 = require("../../../@shareds/enums");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
const booking_status_1 = require("../../../@shareds/enums/booking-status");
const funtions_1 = require("../../../@shareds/utils/funtions");
const create_purchase_1 = require("../purchases/create-purchase");
const create_reference_payment_1 = require("../emis/create-reference-payment");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CreateBookingUseCase {
    async execute(request) {
        try {
            const { description, finalDate, initDate, modalityId, placeId, email, endTime, name, phone, startTime, } = request;
            let user;
            const userExists = await prisma_db_1.default.user.findUnique({ where: { email } });
            if (!userExists) {
                user = await prisma_db_1.default.user.create({
                    data: { email, name, phone, type_user: enums_1.TYPE_USER.USER },
                });
            }
            else {
                user = userExists;
            }
            const [modalities, place] = await Promise.all([
                prisma_db_1.default.modality.findUnique({ where: { id: modalityId } }),
                prisma_db_1.default.place.findUnique({ where: { id: placeId } }),
            ]);
            if (!modalities || !place) {
                return (0, contracts_1.badRequestResponse)({ message: "Modality or Place not found" });
            }
            if ((0, dayjs_1.default)(initDate).isAfter((0, dayjs_1.default)(finalDate))) {
                return (0, contracts_1.badRequestResponse)({
                    message: "Start date must be before final date",
                });
            }
            const booking = await prisma_db_1.default.booking.create({
                data: {
                    user_id: user.id,
                    place_id: place.id,
                    modality_id: modalityId,
                    init_date: initDate,
                    final_date: finalDate,
                    description: description,
                    start_time: startTime,
                    end_time: endTime,
                    status: booking_status_1.BOOKING_STATUS.PENDING,
                    reference: String((0, funtions_1.GenerateReference)()),
                },
            });
            const reducingCapacity = place.capacity - 1;
            const mostRequired = place.most_required && place.most_required + 1;
            await prisma_db_1.default.place.update({
                where: { id: place.id },
                data: {
                    capacity: reducingCapacity,
                    most_required: mostRequired
                },
            });
            const priceWithoutDot = modalities.price.toString().replace(".", "");
            const amount = parseFloat(priceWithoutDot);
            const emisIntegrationService = new create_reference_payment_1.EmisIntegrationService();
            const payment = await emisIntegrationService.generatePaymentReference({
                value: amount,
                plan: `${place.name} - ${modalities.name}`,
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1],
                email: user.email,
                mobile: String(user.phone).trim(),
                identifier: booking.reference,
            });
            // TODO: Validar se a pessoa passou o nome completo ou não
            const purchaseOrder = new create_purchase_1.CreatePurchaseUseCase();
            await purchaseOrder.execute({ bookingId: booking.id });
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, "e0836deb27a4e0e9f2cb4a0f67a33c85", { expiresIn: "1d" });
            const data = { booking, user, token, payment };
            return (0, contracts_1.successResponse)(data);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.CreateBookingUseCase = CreateBookingUseCase;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModalityUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class CreateModalityUseCase {
    async execute(request) {
        try {
            const { name, description, price, duration } = request;
            if (!name || !description || !price || !duration) {
                return (0, contracts_1.badRequestResponse)({ message: 'All fields are required' });
            }
            if (price <= 0 || duration <= 0) {
                return (0, contracts_1.badRequestResponse)({ message: 'Price and duration must be greater than 0' });
            }
            const modality = await prisma_db_1.default.modality.create({ data: request });
            return (0, contracts_1.successResponse)(modality);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.CreateModalityUseCase = CreateModalityUseCase;

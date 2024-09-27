"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetModalityByIDUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class GetModalityByIDUseCase {
    async execute(request) {
        try {
            const modalities = await prisma_db_1.default.modality.findUnique({ where: { id: request } });
            if (!modalities) {
                return (0, contracts_1.badRequestResponse)({ message: 'Modality not found' });
            }
            return (0, contracts_1.successResponse)(modalities);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.GetModalityByIDUseCase = GetModalityByIDUseCase;

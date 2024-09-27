"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPlaceUseCase = void 0;
const contracts_1 = require("../../../@shareds/contracts");
const prisma_db_1 = __importDefault(require("../../../infra/database/prisma-db"));
class EditPlaceUseCase {
    async execute(request) {
        try {
            const findPlace = await prisma_db_1.default.place.findUnique({
                where: { id: request.id },
            });
            if (!findPlace) {
                return (0, contracts_1.badRequestResponse)({
                    message: "Place not exists",
                });
            }
            request.name = request.name ?? findPlace.name;
            request.capacity = request.capacity ?? findPlace.capacity;
            const photo = request.photo === '' ? findPlace.photo : request.photo;
            const place = await prisma_db_1.default.place.update({ where: { id: request.id }, data: {
                    name: request.name,
                    capacity: request.capacity,
                    photo: photo,
                } });
            return (0, contracts_1.successResponse)(place);
        }
        catch (error) {
            return (0, contracts_1.errorResponse)(error);
        }
    }
}
exports.EditPlaceUseCase = EditPlaceUseCase;

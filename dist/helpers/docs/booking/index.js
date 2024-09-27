"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const all_bookings_1 = __importDefault(require("./all-bookings"));
const booking_by_id_1 = __importDefault(require("./booking-by-id"));
const booking_by_reference_1 = __importDefault(require("./booking-by-reference"));
exports.default = {
    '/booking': {
        ...create_1.default
    },
    '/booking(get all bookings)': {
        ...all_bookings_1.default
    },
    '/booking/{id}': {
        ...booking_by_id_1.default
    },
    '/booking/{reference}/reference': {
        ...booking_by_reference_1.default
    }
};

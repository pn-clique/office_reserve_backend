"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const all_places_1 = __importDefault(require("./all-places"));
const place_by_id_1 = __importDefault(require("./place-by-id"));
exports.default = {
    '/places': {
        ...create_1.default
    },
    '/places(get all places)': {
        ...all_places_1.default
    },
    '/places/{id}': {
        ...place_by_id_1.default
    }
};

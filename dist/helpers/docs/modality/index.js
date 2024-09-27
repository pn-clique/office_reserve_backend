"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const all_modality_1 = __importDefault(require("./all-modality"));
const modality_by_id_1 = __importDefault(require("./modality-by-id"));
exports.default = {
    '/modality': {
        ...create_1.default
    },
    '/modality(get all modality)': {
        ...all_modality_1.default
    },
    '/modality/{id}': {
        ...modality_by_id_1.default
    }
};

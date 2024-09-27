"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const login_1 = __importDefault(require("./login"));
exports.default = {
    '/v1/auth/create': {
        ...create_1.default,
    },
    '/v1/auth/login': {
        ...login_1.default,
    },
};

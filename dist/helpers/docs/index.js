"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicInfo_doc_1 = __importDefault(require("./basicInfo.doc"));
const components_doc_1 = __importDefault(require("./components.doc"));
const servers_1 = __importDefault(require("./servers"));
const tags_doc_1 = __importDefault(require("./tags.doc"));
const auth_1 = __importDefault(require("./auth"));
const places_1 = __importDefault(require("./places"));
const modality_1 = __importDefault(require("./modality"));
const booking_1 = __importDefault(require("./booking"));
exports.default = {
    ...basicInfo_doc_1.default,
    ...servers_1.default,
    ...tags_doc_1.default,
    ...components_doc_1.default,
    paths: {
        ...auth_1.default,
        ...places_1.default,
        ...modality_1.default,
        ...booking_1.default
    },
};

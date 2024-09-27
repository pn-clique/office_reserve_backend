"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./infra/http/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./helpers/docs"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
const corsOrigin = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
app.use('/v1/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
app.use((0, cors_1.default)(corsOrigin));
app.use(routes_1.default);
exports.default = app;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const places_routes_1 = __importDefault(require("./places.routes"));
const modality_routes_1 = __importDefault(require("./modality.routes"));
const booking_routes_1 = __importDefault(require("./booking.routes"));
const finance_routes_1 = __importDefault(require("./finance.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const callback_routes_1 = __importDefault(require("./callback.routes"));
const callback_1 = require("../../controllers/callback");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    return res.json('Server is running');
});
router.use(users_routes_1.default);
router.use(places_routes_1.default);
router.use(booking_routes_1.default);
router.use(finance_routes_1.default);
router.use(callback_routes_1.default);
router.use(modality_routes_1.default);
router.post('/emis', new callback_1.CallBackController().handle);
exports.default = router;

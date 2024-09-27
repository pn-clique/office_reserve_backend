"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const callback_1 = require("../../controllers/callback");
const router = (0, express_1.Router)();
router.post('/callback-office-reserve', new callback_1.CallBackController().handle);
exports.default = router;

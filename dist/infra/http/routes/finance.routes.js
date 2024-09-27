"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.post('/finance', new controllers_1.CreateFinanceController().handle);
router.get('/finance', new controllers_1.GetFinanceController().handle);
exports.default = router;

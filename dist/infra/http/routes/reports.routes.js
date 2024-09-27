"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const router = (0, express_1.Router)();
router.get("/general-reports/:id", new controllers_1.AllReportsController().handle);
exports.default = router;

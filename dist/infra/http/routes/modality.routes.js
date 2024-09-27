"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modalities_1 = require("../../controllers/modalities");
const router = (0, express_1.Router)();
router.post('/modality', new modalities_1.CreateModalityController().handle);
router.get('/modality/:id', new modalities_1.ModalityIDController().handle);
router.get('/modality', new modalities_1.AllModalityController().handle);
exports.default = router;

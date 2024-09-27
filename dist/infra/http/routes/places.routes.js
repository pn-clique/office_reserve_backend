"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const places_1 = require("../../controllers/places");
const helpers_1 = require("../../../helpers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
const router = (0, express_1.Router)();
router.post('/places', upload.single("photo"), helpers_1.uploadFile, new places_1.CreatePlaceController().handle);
router.put('/places/:id', upload.single("photo"), helpers_1.uploadFile, new places_1.EditPlaceController().handle);
router.get('/places/:id', new places_1.PlaceByIDController().handle);
router.delete('/places/:id', new places_1.DeletePlaceController().handle);
router.get('/places', new places_1.AllPlaceController().handle);
exports.default = router;

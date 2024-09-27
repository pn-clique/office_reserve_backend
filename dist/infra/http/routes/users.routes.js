"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const helpers_1 = require("../../../helpers");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
const router = (0, express_1.Router)();
router.post('/user', new controllers_1.CreateUserController().handle);
router.post('/login-social', new controllers_1.LoginSocialUserController().handle);
router.put('/forgot-password', new controllers_1.ForgotPasswordUserController().handle);
router.put('/reset-password', new controllers_1.ResetPasswordUserController().handle);
router.post('/login', new controllers_1.LoginController().handle);
router.put('/user/:id', upload.single("photo"), helpers_1.uploadFile, new controllers_1.EditUserController().handle);
router.get('/user/:id', new controllers_1.UserByIDController().handle);
router.get('/user-by-email/:email', new controllers_1.UserByEmailController().handle);
router.get('/users', new controllers_1.AllUsersController().handle);
exports.default = router;

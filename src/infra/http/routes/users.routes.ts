import { Router  } from "express";
import { AllUsersController, CreateUserController, EditUserController, ForgotPasswordUserController, LoginController, LoginSocialUserController, ResetPasswordUserController, UserByEmailController, UserByIDController } from "../../controllers";
import { uploadFile } from "../../../helpers";

import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/login-social', new LoginSocialUserController().handle);
router.put('/forgot-password', new ForgotPasswordUserController().handle);
router.put('/reset-password', new ResetPasswordUserController().handle);
router.post('/login', new LoginController().handle)
router.put('/user/:id', upload.single("photo"), uploadFile, new EditUserController().handle);
router.get('/user/:id', new UserByIDController().handle);
router.get('/user-by-email/:email', new UserByEmailController().handle);
router.get('/users', new AllUsersController().handle);

export default router;
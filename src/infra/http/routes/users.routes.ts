import { Router  } from "express";
import { AllUsersController, CreateUserController, EditUserController, LoginController, LoginSocialUserController, UserByIDController } from "../../controllers";
import { uploadFile } from "../../../helpers";

import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/login-social', new LoginSocialUserController().handle);
router.post('/login', new LoginController().handle)
router.put('/user/:id', upload.single("photo"), uploadFile, new EditUserController().handle);
router.get('/user/:id', new UserByIDController().handle);
router.get('/users', new AllUsersController().handle);

export default router;
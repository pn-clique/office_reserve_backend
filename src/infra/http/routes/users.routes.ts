import { Router  } from "express";
import { CreateUserController, LoginController } from "../../controllers";

const router = Router();

router.post('/user', new CreateUserController().handle);
router.post('/login', new LoginController().handle)

export default router;
import { Router } from "express";
import { CallBackController } from "../../controllers/callback";

const router = Router();

router.post('/callback-office-reserve', new CallBackController().handle);

export default router;
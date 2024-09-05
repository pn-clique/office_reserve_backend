import { Router  } from "express";
import { CreateFinanceController, GetFinanceController } from "../../controllers";

const router = Router();

router.post('/finance', new CreateFinanceController().handle);
router.get('/finance', new GetFinanceController().handle);

export default router;
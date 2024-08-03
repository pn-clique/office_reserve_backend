import { Router  } from "express";
import { AllModalityController, CreateModalityController, ModalityIDController } from "../../controllers/modalities";

const router = Router();

router.post('/modality', new CreateModalityController().handle);

router.get('/modality/:id', new ModalityIDController().handle);
router.get('/modality', new AllModalityController().handle);

export default router;
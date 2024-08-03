import { Router  } from "express";
import { AllPlaceController, CreatePlaceController, PlaceByIDController } from "../../controllers/places";

const router = Router();

router.post('/places', new CreatePlaceController().handle);

router.get('/places/:id', new PlaceByIDController().handle);
router.get('/places', new AllPlaceController().handle);

export default router;
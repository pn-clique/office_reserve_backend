import { Router  } from "express";
import { AllPlaceController, CreatePlaceController, PlaceByIDController } from "../../controllers/places";
import { uploadFile } from "../../../helpers";
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/places', upload.single("photo"), uploadFile, new CreatePlaceController().handle);

router.get('/places/:id', new PlaceByIDController().handle);
router.get('/places', new AllPlaceController().handle);

export default router;
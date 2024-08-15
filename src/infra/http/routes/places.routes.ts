import { Router  } from "express";
import { AllPlaceController, CreatePlaceController, DeletePlaceController, EditPlaceController, PlaceByIDController } from "../../controllers/places";
import { uploadFile } from "../../../helpers";
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = Router();

router.post('/places', upload.single("photo"), uploadFile, new CreatePlaceController().handle);
router.put('/places/:id', upload.single("photo"), uploadFile, new EditPlaceController().handle);
router.get('/places/:id', new PlaceByIDController().handle);
router.delete('/places/:id', new DeletePlaceController().handle);
router.get('/places', new AllPlaceController().handle);

export default router;
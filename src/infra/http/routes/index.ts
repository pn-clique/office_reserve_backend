import { Router  } from "express";
import placeRoutes from './places.routes';
import modalitiesRoutes from './modality.routes';
import bookingRoutes from './booking.routes';
import financeRoutes from './finance.routes';
import userRoutes from './users.routes';
import callbackRoutes from './callback.routes';

const router = Router();

router.get('/', (req, res) => {
  return res.json('Server is running')
});


router.use(userRoutes)
router.use(placeRoutes);
router.use(bookingRoutes);
router.use(financeRoutes);
router.use(callbackRoutes);
router.use(modalitiesRoutes);

export default router;
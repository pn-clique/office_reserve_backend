import { Router  } from "express";
import { AllBookingsController, BookingsByIDController, BookingsByReferenceController, CreateBookingController } from "../../controllers";

const router = Router();

router.post('/booking', new CreateBookingController().handle);

router.get('/booking/:id', new BookingsByIDController().handle);
router.get('/booking/:reference/reference', new BookingsByReferenceController().handle);

router.get('/booking', new AllBookingsController().handle);

export default router;
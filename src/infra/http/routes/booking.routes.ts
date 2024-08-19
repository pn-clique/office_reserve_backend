import { Router } from "express";
import {
  AllBookingsController,
  BookingsByIDController,
  BookingsByReferenceController,
  BookingsByUserIdController,
  CreateBookingController,
  EditBookingController,
} from "../../controllers";

const router = Router();

router.post("/booking", new CreateBookingController().handle);

router.get("/booking/:id", new BookingsByIDController().handle);
router.put("/booking/:id", new EditBookingController().handle);
router.get("/booking-by-user/:id", new BookingsByUserIdController().handle);
router.get(
  "/booking/:reference/reference",
  new BookingsByReferenceController().handle
);

router.get("/booking", new AllBookingsController().handle);

export default router;

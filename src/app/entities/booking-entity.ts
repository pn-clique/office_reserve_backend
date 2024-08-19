import { BOOKING_STATUS } from "../../@shareds/enums/booking-status";


export interface BookingEntity {
  id: string
  userId: string;
  placeId: string;
  modalityId: string;
  initDate: Date;
  finalDate: Date;
  description: string;
  reference?: string;
  status: BOOKING_STATUS;
}
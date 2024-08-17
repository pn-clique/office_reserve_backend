
export interface ICreateBookingRequest {
  placeId: string;
  modalityId: string;
  initDate: Date;
  finalDate: Date;
  description: string;
  startTime: string;
  endTime: string;
  email: string;
  name: string;
  phone: string;
}
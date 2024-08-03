
export interface ICreateBookingRequest {
  placeId: string;
  modalityId: string;
  initDate: Date;
  finalDate: Date;
  description: string;
  startTime: Date;
  endTime: Date;
  email: string;
  name: string;
  phone: string;
}
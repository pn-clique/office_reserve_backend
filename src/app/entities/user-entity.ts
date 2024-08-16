import { TYPE_USER } from "../../@shareds/enums";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  photo?: string;
  typeUser: TYPE_USER;
}
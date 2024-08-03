import { TYPE_USER } from "../../@shareds/enums";

export interface UserEntity {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  typeUser: TYPE_USER;
}
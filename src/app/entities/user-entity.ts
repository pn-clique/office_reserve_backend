import { TYPE_USER } from "../../@shareds/enums";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  photo?: string;
  password_token?: string;
  password_Expires?: Date;
  typeUser: TYPE_USER;
}
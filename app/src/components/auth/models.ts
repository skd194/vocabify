import { JsObject } from "../common/types/Object";

export class LoginFormContent implements ILoginFormContent {
  constructor() {
    this.username = "";
    this.password = "";
  }

  username: string;
  password: string;
}

export interface LoginFormProps {}

export interface ILoginFormContent extends JsObject {
  username: string;
  password: string;
}

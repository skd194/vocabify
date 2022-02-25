import Joi from "joi";
import Form from "../common/form";
import { JsObject } from "../common/types/Object";

class LoginFormContent implements ILoginFormContent {
  constructor() {
    this.username = "";
    this.password = "";
  }

  username: string;
  password: String;
}

interface LoginFormProps {}

interface ILoginFormContent extends JsObject {
  username: string;
  password: String;
}

class LoginForm extends Form<LoginFormProps, ILoginFormContent, {}> {
  constructor() {
    super({}, new LoginFormContent(), {});
  }

  schema = Joi.object({
    username: Joi.string().label("Username").required(),
    password: Joi.string().label("Password").required(),
  });

  doSubmit(): void {
    throw new Error("Method not implemented.");
  }

  render() {
    return (
      <>
        <div
          className="box-light"
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          <h4>Login</h4>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("password", "Password", "password")}
          <button
            type="submit"
            className="button is-pulled-right is-rounded"
            disabled={this.validate() !== null}
          >
            Login
          </button>
        </div>
      </>
    );
  }
}

export default LoginForm;

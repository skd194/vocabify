import Joi from 'joi';
import Form from '../common/form';
import auth from './../../services/auth/authService';
import * as models from './models';

class LoginForm extends Form<
  models.LoginFormProps,
  models.ILoginFormContent,
  {}
> {
  constructor() {
    super({}, new models.LoginFormContent(), {});
  }

  schema = Joi.object({
    username: Joi.string().label('Username').required(),
    password: Joi.string().label('Password').required(),
  });

  async doSubmit() {
    const content = this.state.data;
    var p = await auth.login({
      username: content.username,
      password: content.password,
    });

    //throw new Error("Method not implemented.");
  }

  render() {
    return (
      <>
        <form
          className='box'
          style={{ overflowX: 'auto', overflowY: 'hidden' }}
          onSubmit={this.handleSubmit}
        >
          <h4 className='title is-4'>Login</h4>
          {this.renderInput('username', 'Username', 'text')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderSubmitButton('Login', 'is-pulled-right')}
        </form>
      </>
    );
  }
}

export default LoginForm;
